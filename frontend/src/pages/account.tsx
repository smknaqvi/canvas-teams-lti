import React, { useEffect, useState } from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import {
  login,
  isAuthenticated,
  getProfile,
  getAccessToken,
  logout,
} from '../utils/auth'
import { Link } from 'gatsby'
import { silentAuth } from '../utils/auth'
import axios from 'axios'

interface UserInterface {
  name?: string
}

interface HomeProps {
  user: UserInterface
}

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent

const Home = ({ user }: HomeProps) => {
  const [msg, setMsg] = useState('loading')

  axios
    .get('http://127.0.0.1:3000/api/test', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => setMsg(res.data))
  return (
    <p>
      Hi, {user.name ? user.name : 'friend'}! {msg}
    </p>
  )
}
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <nav>
        <Link to="/account">Home</Link>{' '}
        <Link to="/account/settings">Settings</Link>{' '}
        <Link to="/account/billing">Billing</Link>{' '}
        <a
          href="#logout"
          onClick={(e) => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <RouterPage path="/account" pageComponent={<Home user={user} />} />
        <RouterPage path="/account/settings" pageComponent={<Settings />} />
        <RouterPage path="/account/billing" pageComponent={<Billing />} />
      </Router>
    </>
  )
}

export default Account
