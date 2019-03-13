/**
 * @file sstem configuration for development environment
 * @author ERS
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
    database: 'finton'
  },

  // Express-parameters
  security: {
    // Limit max payload in HTTP body size for express app
    maxLimitPayload: '2mb',
    // Cors parameters
    cors: {
    // Allowed hosts for CORS in express framework
      allowedHost: ['http://localhost:4200']
    },
    // Crypto parameters
    crypto: {
    // Algorithm used for encrypt/decrypt password
      algorithm: 'aes-256-cbc',
      // Salt used for crypto
      password: 'j7EeCaS8trpFLSUh'
    }
  },

  TOKEN_SECRET: 'fqiwejfejfqweioñfeqwiofef',
  errores: {
    BRP: 'BRP',
    U001: 'U001',
    U002: 'U002',
    P001: 'P001',
    P002: 'P002',
    P003: 'P003',
    P401: 'P401',
    P402: 'P402'

  }
}
