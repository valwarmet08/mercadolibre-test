var colors = require('colors');
const CURRENT_ENV = process.env.WEI_ENVIRONMENT || 'development';

/**
 * @class Logger
 * @memberof Helpers
 *
 * @classdesc This class is in charge of generating consoles with colors to debug the most significant code
 *
 * @author  	ChrisNethunter cristian@vifuy.com
 * @requires    colors require('colors')
 *
 */
class Logger {
  
    constructor(){}
    /**
        * @function
        * @description This function is in charge of displaying a blue console to represent a debug of the application
        * @name debug#connectAndSubscribe
        * @param {string}  message
        * @param {object}  object
        * @throws {SomeException} blah.
        * @return {boolean}  true
    **/
    debug(message, object) {
        if (!object) object = "";
        if (CURRENT_ENV != "development") return;
        console.log(dateFormat(new Date()) + " DEBUG: ".blue + message, object);
    }
    warning(message, object) {
        if (!object) object = "";
        console.log(dateFormat(new Date()) + " WARNING: ".yellow + message, object);
    }
    error(message, object) {
        if (!object) object = "";
        console.log(dateFormat(new Date()) + " ERROR: ".red + message, object);
    }
    info(message, object) {
        if (!object) object = "";
        console.log(dateFormat(new Date()) + " INFO: ".blue + message, object);
    }
    success(message, object) {
        if (!object) object = "";
        console.log(dateFormat(new Date()) + " SUCCESS: ".green + message, object);
    }
};

function dateFormat(date) {
    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " +
        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

module.exports = new Logger();