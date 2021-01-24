import auth0 from 'auth0-js'
import { navigate } from 'gatsby'

interface UserInterface {
  name?: string
}

interface TokenInterface {
  accessToken: boolean
  idToken: boolean | string
  expiresAt: boolean | number
}

const isBrowser = typeof window !== 'undefined'

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN || '',
      clientID: process.env.AUTH0_CLIENTID || '',
      redirectUri: process.env.AUTH0_CALLBACK || '',
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  : {}

// insert after auth const
const tokens: TokenInterface = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user: UserInterface = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem('isLoggedIn') === 'true'
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  /* @ts-expect-error */
  auth.authorize()
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const setSession = (cb = () => {}) => (
  err: unknown,
  authResult: {
    accessToken: boolean
    idToken: boolean
    expiresIn: number
    idTokenPayload: unknown
  }
) => {
  if (err) {
    navigate('/')
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload as UserInterface
    localStorage.setItem('isLoggedIn', 'true')
    navigate('/account')
    cb()
  }
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  /* @ts-expect-error */
  auth.parseHash(setSession())
}

export const getProfile: () => UserInterface = () => {
  return user
}

export const getIdToken = () => {
  return tokens.idToken
}

export const silentAuth = (callback: () => any) => {
  if (!isAuthenticated()) return callback()
  /* @ts-expect-error */
  auth.checkSession({}, setSession(callback))
}

export const logout = () => {
  localStorage.setItem('isLoggedIn', 'false')
  /* @ts-expect-error */
  auth.logout()
}
