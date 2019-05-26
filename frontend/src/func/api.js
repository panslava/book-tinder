import axios from 'axios'
import { server } from '../params'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export async function setAuthHeader() {
  let res = await axios.get(server.link + 'request_user', {
    params: { login: 'ruth', password: 'password' }
  })
  cookies.set('auth', res.data.hash, { path: '/' })
}

export async function getCards(params) {
  if (!cookies.get('auth')) {
    await setAuthHeader()
  }
  return axios.get(server.link + 'cards', {
    params: params,
    headers: {
      Auth: cookies.get('auth')
    }
  })
}
