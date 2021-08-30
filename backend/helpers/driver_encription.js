const crypto = require('crypto');
const CURRENT_ENV = process.env.NODE_ENV || 'development';
const config = require('../config.json');
const secretKey = config[CURRENT_ENV].ENCRYPTION_KEY;
const algorithm = 'aes-256-cbc';

/**
 *  @function encrypt
 *
 * @classdesc unction for the text encription based private key of the settings
 *
 * @author  	Theevil24a theevil24a@gmail.com
 * @requires    colors require('colors')
 *
 */
function encrypt(text) {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
}
   
/**
 *  @function decrypt
 *
 * @classdesc function for the text decription based private key of the settings
 *
 * @author  	Theevil24a theevil24a@gmail.com
 * @requires    colors require('colors')
 *
 */
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.content, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {
    encrypt,
    decrypt
};