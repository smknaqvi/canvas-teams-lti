const React = require('react')
const Auth0Provider = require('@auth0/auth0-react').Auth0Provider
const navigate = require('gatsby').navigate

const onRedirectCallback = (appState) => {
  navigate(appState?.returnTo || '/account', { replace: true })
}

exports.wrapRootElement = ({ element }) => {
  const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || ''
  const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID || ''
  const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || ''

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENTID}
      redirectUri={`${window.location.origin}/account`}
      audience={AUTH0_AUDIENCE}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  )
}
