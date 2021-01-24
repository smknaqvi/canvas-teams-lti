import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import {
  login,
  isAuthenticated,
  getProfile,
  getIdToken,
  logout,
} from '../utils/auth'
import { Link } from 'gatsby'

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
  return <p>Hi, {user.name ? user.name : 'friend'}!</p>
}
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => {
  let res = ''
  console.log(getIdToken())
  axios
    .get('http://127.0.0.1:3000/api/test', {
      headers: {
        Authorization: `Bearer ${getIdToken()}`,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res) => console.log(res))

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
