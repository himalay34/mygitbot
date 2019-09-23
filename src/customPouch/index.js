'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var EPouchDB = _interopDefault(require('express-pouchdb'));
var utils = _interopDefault(require('express-pouchdb/lib/utils'));
var jwt = _interopDefault(require('jsonwebtoken'));
const customAuthorization = require("./authorization"); 
const auth_handler = "{couch_jwt_auth, jwt_authentication_handler}";

// mimics couch_jwt_auth for express-pouchdb
function jwtroute (pouchapp) {
	pouchapp.couchConfig.registerDefault("jwt_auth", "username_claim", "sub");
	pouchapp.couchConfig.registerDefault("jwt_auth", "roles_claim", "roles");

	let authhandlers = pouchapp.couchConfig.get("httpd", "authentication_handlers") || "";
	if (!~authhandlers.indexOf(auth_handler)) {
		authhandlers = auth_handler + (authhandlers ? "," + authhandlers : "");
	}
	pouchapp.couchConfig.set("httpd", "authentication_handlers", authhandlers, () => {});

	pouchapp.use(function (req, res, next) {
		req.couchSession.info.authentication_handlers.push("jwt");
		
		var sessionID = (req.cookies || {}).AuthSession;
		
		// ignore requests that are already authenticated
		if (sessionID || req.couchSession.userCtx.name) return next();

		// ignore requests without authorization
		var token = req.headers.authorization;
		if (!token) return next();
		
		// decode the secret
		let secret = process.env.SECRET || pouchapp.couchConfig.get("jwt_auth", "hs_secret") || "secretP0uchdb";
		let payload;

		try {
			payload = jwt.verify(token, secret, {
				algorithms: ["HS256"]
			});
		} catch (e) {
			return utils.sendError(res, e, 401);
		}

		if (!payload.userContext) {
			var error = new Error("Missing userContext in payload")
			utils.sendError(res, error);
			return;
		}
		
		return req.couchSession = {
			ok: true,
			userCtx: payload.userContext
		};
			
		req.couchSession.info.authenticated = "jwt";

		next();
	});
}

var modes = {};
modes.custom = [];
modes.minimumForPouchDB = [
// sorted alphabetically
'compression', 'routes/404', 'routes/all-dbs', 'routes/all-docs', 'routes/attachments', 'routes/bulk-docs', 'routes/bulk-get', 'routes/changes', 'routes/compact', 'routes/db', 'routes/documents', 'routes/revs-diff', 'routes/root', 'routes/session-stub', 'routes/temp-views', 'routes/view-cleanup', 'routes/views'];

modes.fullCouchDB = [
// sorted alphabetically
'config-infrastructure', 'disk-size', 'logging-infrastructure', 'replicator', 'routes/active-tasks', 'routes/authentication', 'routes/authorization', 'routes/cluster', 'routes/cluster-rewrite', 'routes/config', 'routes/db-updates', 'routes/ddoc-info', 'routes/fauxton', 'routes/find', 'routes/http-log', 'routes/list', 'routes/log', 'routes/replicate', 'routes/rewrite', 'routes/security', 'routes/session', 'routes/show', 'routes/special-test-auth', 'routes/stats', 'routes/update', 'routes/uuids', 'routes/vhosts', 'validation'].concat(modes.minimumForPouchDB);

function toObject(array) {
	var result = {};
	array.forEach(function (item) {
		result[item] = true;
	});
	return result;
}

function index (startPouchDB, opts) {
	// both PouchDB and opts are optional
	if (startPouchDB && !startPouchDB.defaults) {
		var _ref = [startPouchDB, null];
		opts = _ref[0];
		startPouchDB = _ref[1];
	}

	opts = opts || {};

	const pouchapp = EPouchDB(Object.assign({}, opts, {
		mode: "custom",
		overrideMode: {}
	}));

	let setPouchDB = pouchapp.setPouchDB;
	pouchapp.setPouchDB = function (PouchDB) {
		pouchapp.PouchDB = PouchDB;
		return setPouchDB(PouchDB);
	};

	// determine which parts of express-pouchdb to activate
	opts.overrideMode = opts.overrideMode || {};
	opts.overrideMode.include = opts.overrideMode.include || [];
	opts.overrideMode.exclude = opts.overrideMode.exclude || [];
	opts.overrideMode.include.forEach(function (part) {
		if (modes.fullCouchDB.indexOf(part) === -1) {
			throw new Error("opts.overrideMode.include contains the unknown part '" + part + "'.");
		}
	});

	var modeIncludes = modes[opts.mode || 'fullCouchDB'];
	if (!modeIncludes) {
		throw new Error('Unknown mode: ' + opts.mode);
	}
	var allIncludes = modeIncludes.concat(opts.overrideMode.include);
	pouchapp.includes = toObject(allIncludes);
	opts.overrideMode.exclude.forEach(function (part) {
		if (!pouchapp.includes[part]) {
			throw new Error("opts.overrideMode.exclude contains the not included part '" + part + "'.");
		}
		delete pouchapp.includes[part];
	});

	// load all modular files
	[
	// order matters in this list!
	'config-infrastructure', 'logging-infrastructure', 'compression', 'disk-size', 'replicator', 'routes/http-log', 'routes/authentication', jwtroute, 'routes/special-test-auth', 'routes/authorization',customAuthorization, 'routes/vhosts', 'routes/cluster-rewrite', 'routes/rewrite', 'routes/root', 'routes/log', 'routes/session', 'routes/session-stub', 'routes/fauxton', 'routes/cluster', 'routes/config', 'routes/uuids', 'routes/all-dbs', 'routes/replicate', 'routes/active-tasks', 'routes/db-updates', 'routes/stats', 'routes/db', 'routes/bulk-docs', 'routes/bulk-get', 'routes/all-docs', 'routes/changes', 'routes/compact', 'routes/revs-diff', 'routes/security', 'routes/view-cleanup', 'routes/temp-views', 'routes/find', 'routes/views', 'routes/ddoc-info', 'routes/show', 'routes/list', 'routes/update', 'routes/attachments', 'routes/documents', 'validation', 'routes/404'].forEach(function (file) {
		if (typeof file === "function") {
			file(pouchapp);
		} else if (pouchapp.includes[file]) {
			require('express-pouchdb/lib/' + file)(pouchapp);
		}
	});

	if (startPouchDB) {
		pouchapp.setPouchDB(startPouchDB);
	}

	return pouchapp;
}

module.exports = index;