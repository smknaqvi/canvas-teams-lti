import React from 'react'
import { navigate } from '@reach/router'
import { Auth0Provider } from '@auth0/auth0-react'

interface Props {
  children: Element
}

const Auth0ProviderWithHistory = ({ children }: Props) => {
  const domain = process.env.AUTH0_DOMAIN || ''
  const clientId = process.env.AUTH0_CLIENT_ID || ''

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
