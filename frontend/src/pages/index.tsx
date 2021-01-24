import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'gatsby'

const IndexPage = () => {
  const { isLoading, loginWithRedirect, isAuthenticated, logout } = useAuth0()

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <p>Hello World</p>
      {isAuthenticated && <Link to="/account">Go to your account</Link>}
      {!isAuthenticated ? (
        <a onClick={loginWithRedirect}>Log In</a>
      ) : (
        <a onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </a>
      )}
    </div>
  )
}

export default IndexPage
