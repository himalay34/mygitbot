const Manager = require('./manager');

class LoggerFilter extends Manager {
    init(bot) {
        console.log("logger")
    }
}

module.exports = LoggerFilter;