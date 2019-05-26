import axios from 'axios'
import { server } from '../params'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export async function setAuthHeader(params) {
  let res = await axios.get(server.link + 'request_user', {
    params: params || {
      login: `login${Math.floor(Math.random() * 48 + 1)}`,
      password: 'password'
    }
  })
  console.log(res)
  await cookies.set('Auth', res.data.hash, { path: '/' })
  await cookies.set('user', res.data, { path: '/' })
  console.log(cookies)
}

export async function getCards(params) {
  let auth = await cookies.get('Auth')
  if (!auth) {
    await setAuthHeader()
    auth = await cookies.get('Auth')
  }
  console.log(auth)
  return axios.get(server.link + 'cards', {
    params: params,
    headers: {
      Auth: auth
    }
  })
}

export async function like(params) {
  let auth = await cookies.get('Auth')
  if (!auth) {
    await setAuthHeader()
    auth = await cookies.get('Auth')
  }
  console.log(auth)
  console.log(params)
  return axios.get(server.link + 'like', {
    params: params,
    headers: {
      Auth: auth
    }
  })
}

export async function getUser() {
  let user = await cookies.get('user')
  if (!user) {
    await setAuthHeader()
    user = await cookies.get('user')
  }

  return user
}

export async function getMatches() {
  let auth = await cookies.get('Auth')
  if (!auth) {
    await setAuthHeader()
    auth = await cookies.get('Auth')
  }
  console.log(auth)

  return axios.get(server.link + 'matches', {
    headers: {
      Auth: auth
    }
  })
}

export async function isAuthorized() {
  return await !!cookies.get('Auth')
}
