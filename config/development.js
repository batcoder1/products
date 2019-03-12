/**
 * @file Evolupay system configuration for development environment 
 * @author Evolupay
 */

module.exports = {

    SERVER_PORT: 3003,

    // Mongo env parameters 
    mongodb: {
        // Username
        username: 'finuser',
        // Password
        pwd: '6af14589d1369c15b280c79ff35a2e6e002a69ac39f2ba51d9c5490932ec4cdb',
        // Hostname
        host: 'ds247327.mlab.com',
        // database port
        port: 47327,
        // database name
        database: 'finton',
    },
//4c335602b511a2db

 
    // Express parameters 
    security: {
        // Limit max payload in HTTP body size for express app
        maxLimitPayload: '2mb',
        // Cors parameters
        cors: {
            // Allowed hosts for CORS in express framework
            allowedHost: [ 'http://localhost:4200'],
        },
        // Crypto parameters
        crypto: {
            // Algorithm used for encrypt/decrypt password
            algorithm: 'aes-256-cbc',
            // Salt used for crypto
            password: 'j7EeCaS8trpFLSUh',
        },
        // Parameters for login in security order
        login: {
          // Max number of login attemps for an user because being banned
          maxAttemptsLoginFail: process.env.MAX_ATTEMPTS_LOGIN_FAIL,
          // When the IP address is released from the blacklist in days
          expireAtBlacklistIp: process.env.EXPIRE_AT_BLACKLIST_IP,
        }
    },
 
   
    TOKEN_SECRET: 'fqiwejfejfqweioñfeqwiofef'
};