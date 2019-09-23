const chalk = require("chalk");
const winston = require('winston');

module.exports = winston.createLogger({
      level: 'info',
      transports: [
          new winston.transports.Console(),
          new winston.transports.File({
              filename: '../../combined.log'
          })
      ],
      format: winston.format.combine(
        winston.format.colorize(),
	      winston.format.timestamp({ format: 'MM/DD/YYYY HH:mm:ss' }),
	      winston.format.printf(log => {      
          return  `[${log.timestamp}] [${chalk.yellow(log.level.ucfirst())}]: ${JSON.stringify(log.message)}`
        })
	    )   
    });