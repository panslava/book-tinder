import React from 'react'
import { setAuthHeader } from '../../func/api'

import { server } from '../../params'
import './style.css'

export default class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)

    this.handleChangeLogin = this.handleChangeLogin.bind(this)

    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleLogin() {
    setAuthHeader({ login: this.state.login, password: this.state.password })
    this.props.authorizedCallback()
  }

  handleChangeLogin(event) {
    this.setState({ login: event.target.value })
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <form className="auth__overlay">
        <input
          type="text"
          placeholder="Логин"
          value={this.state.login}
          onChange={this.handleChangeLogin}
          className="login"
        />
        <input
          placeholder="Пароль"
          value={this.state.password}
          onChange={this.handleChangePassword}
          className="password"
        />
        <button
          type="submit"
          className="btn"
          onClick={() => {
            console.log(222)
            this.handleLogin()
          }}
        >
          Войти
        </button>
      </form>
    )
  }
}
