/**
 * @file  utils file
 * @author ERS
 */

const crypto = require('crypto');
const config = require('../../config/development');

// Exports all utils functions
module.exports = {
 
    /**
     * Encrypt text using the algorithm & salt password configured
     * @param  {string} text Password to encrypt
     * @return {string} Encrypted password
     */
    encryptText(text) {

        // Create Cipher using the algorithm & salt password  
        const cipher = crypto.createCipher(
            config.security.crypto.algorithm,
            config.security.crypto.password
        );

        // Update the cypher using as input encoding UTF-8 & hexadecimal
        // as output encoding and return the encrypted text
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

    },
    /**
     * Decrypt text using the algorithm & salt password configured
     * @param  {string} text Password to decrypt
     * @return {string} Raw password
     */
    decryptText(text) {

        // Create Cipher using the algorithm & salt password  
        const decipher = crypto.createDecipher(
            config.security.crypto.algorithm,
            config.security.crypto.password
        );
        
        // Update the cypher using as input encoding hexadecimal & UTF-8
        // as output encoding and return the decrypted text
        return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    }
 
};