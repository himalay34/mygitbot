"use strict";
const utils = require("express-pouchdb/lib/utils");

module.exports = function (app) {
	utils.requires(app, 'routes/authentication');
	utils.requires(app, 'routes/authorization');
	
	// user is already logged in 
	app.get('/foo',liggedIn)
	
	//http://localhost:3000/_membership
	app.get('/_membership', requiresServerAdmin);
	//http://localhost:3000/_node/node1@127.0.0.1/_config/admins/batman
	app.put('/_node/node1@127.0.0.1/_config/admins/:key', requiresServerAdmin);
	//Request URL:http://localhost:3000/_node/node1@127.0.0.1/_config/admins/batman
	app.delete('/_node/node1@127.0.0.1/_config/admins/:key', requiresServerAdmin);

    function requiresServerAdmin(req, res, next) {
        
		if (req.couchSession.userCtx.roles.indexOf('_admin') !== -1 || req.couchSession.userCtx.name == 'forhad') {
			return next();
		}
		utils.sendJSON(res, 401, {
			error: 'unauthorized',
			reason: "You are not authorized to access this endPoint.Only Admins are allowed."
		});
	}
	
	function liggedIn(req,res,next){
	
		var sessionID = (req.cookies || {}).AuthSession;
		
		if(sessionID) return next();
		
		utils.sendJSON(res, 401, {
			error: 'unauthorized',
			reason: "You are not logged in."
		});
	}
	
	function guardDb(req,res, next) {
		// set db
		const DB = new (require('pouchdb'))('./store/acldb');
		// get req path 
		console.log(req.path)
		// get req method
		console.log(req.method)
		next();
	}
};
