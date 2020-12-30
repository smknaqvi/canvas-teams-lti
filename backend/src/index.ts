const path = require('path')

// Require Provider 
const lti = require('ltijs').Provider
const Database = require('ltijs-sequelize')

// Setup ltijs-sequelize using the same arguments as Sequelize's generic contructor
const db = new Database('auth', 'lti', 'password', 
  { 
    host: 'localhost',
    dialect: 'postgres',
    logging: true 
  })

// Setup provider
lti.setup('kiw0nApfmyX3RDOUHAVB2VUnZsJUZjliNlwwz2V0YBDVMptsIXTSTEFR1ArpnwVF', // Key used to sign cookies and tokens
  { 
    plugin: db // Passing db object to plugin field
  },
  { // Options
    appRoute: '/', loginRoute: '/login', // Optionally, specify some of the reserved routes
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    devMode: true // Set DevMode to true if the testing platform is in a different domain and https is not being used
  }
)

// Set lti launch callback
lti.onConnect((token, req, res) => {
  console.log(token)
  console.log("We got here")
  return res.send('It\'s alive!')
})

const setup = async () => {
    console.log("deployed");
  // Deploy server and open connection to the database
  await lti.deploy({ port: 3000 }) // Specifying port. Defaults to 3000

  // Register platform
  await lti.registerPlatform({
    url: 'https://canvas.instructure.com',
    name: 'canvas',
    clientId: '10000000000002',
    authenticationEndpoint: 'http://127.0.0.2:8080/api/lti/authorize_redirect',
    //authenticationEndpoint: 'https://canvas.test.instructure.com/api/lti/authorize_redirect',
    //authenticationEndpoint: 'http://127.0.0.2:8080/login/oauth2/auth',
    accesstokenEndpoint: 'http://127.0.0.2:8080/login/oauth2/token',
    //authConfig: { method: 'JWK_SET', key: 'https://canvas.test.instructure.com/api/lti/security/jwks' }
    authConfig: { method: 'JWK_SET', key: 'http://127.0.0.2:8080/api/lti/security/jwks' }
  })
}

setup()