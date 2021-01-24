import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import { login, isAuthenticated, getProfile } from '../utils/auth'
import { Link } from 'gatsby'

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
