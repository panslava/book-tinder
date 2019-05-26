import axios from 'axios'
import { server } from '../params'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export async function setAuthHeader() {
  let res = await axios.get(server.link + 'request_user', {
    params: { login: 'admarkov', password: 'password' }
  })
  await cookies.set('auth', res.data.hash, { path: '/' })
  await cookies.set('user', res.data, { path: '/' })
}

export async function getCards(params) {
  let auth = await cookies.get('auth')
  if (!auth) {
    await setAuthHeader()
    auth = await cookies.get('auth')
  }
  return axios.get(server.link + 'cards', {
    params: params,
    headers: {
      Auth: auth
    }
  })
}

export async function like(params) {
  let auth = await cookies.get('auth')
  if (!auth) {
    await setAuthHeader()
    auth = await cookies.get('auth')
  }
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
  let auth = await cookies.get('auth')
  if (!auth) {
    await setAuthHeader()
    auth = await cookies.get('auth')
  }
  return axios.get(server.link + 'matches', {
    headers: {
      Auth: auth
    }
  })
}
