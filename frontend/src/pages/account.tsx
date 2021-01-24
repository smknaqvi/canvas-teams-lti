import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import axios from 'axios'

const AccountPage = () => {
  // This is temporary set up just to show how this works
  // We will abstratct the api and token handling later
  const { user, getAccessTokenSilently, logout } = useAuth0()
  const [msg, setMsg] = useState('loading...')
  useEffect(() => {
    getAccessTokenSilently({ audience: process.env.AUTH0_AUDIENCE })
      .then((token) =>
        axios.get('http://127.0.0.1:3000/api/test', {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Access-Control-Allow-Origin': '*',
          },
        })
      )
      .then(({ data }) => setMsg(data))
  }, [getAccessTokenSilently])

  return (
    <ul>
      <li>Name: {user.nickname}</li>
      <li>E-mail: {user.email}</li>
      <li>Message: {msg}</li>
      <a onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </a>
    </ul>
  )
}

export default withAuthenticationRequired(AccountPage)
