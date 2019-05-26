import React from 'react'

import { getUser } from '../../func/api'
import { server } from '../../params'

import './style.css'

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  async componentDidMount() {
    let user = await getUser()
    this.setState({ user: user })
    // console.log(this.state.user.avatar)
  }
  render() {
    return (
      <div className="header">
        <div className="trig">
          <font>Подборка</font>
          <label className="switch">
            <input type="checkbox" onChange={this.props.handlerType} />
            <span className="slider round" />
          </label>
          <font>Matches</font>
        </div>
        <div className="user">
          {this.state.user && this.state.user.avatar ? (
            <img
              className="user__img"
              src={server.host + this.state.user.avatar}
              alt="avatar"
            />
          ) : (
            <i className="fas fa-user-alt" />
          )}
        </div>
      </div>
    )
  }
}
