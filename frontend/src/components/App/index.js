import React from 'react'

import './style.css'
import Header from '../Header'
import Matches from '../Matches'
import Cards from '../Cards'
import Auth from '../Auth'

import { isAuthorized } from '../../func/api'

export default class App extends React.Component {
  state = {
    matches: false,
    markers: '',
    authorized: false
  }

  async componentDidMount() {
    let isAuth = await isAuthorized()
    this.setState({ authorized: isAuth })
  }

  authorizedCallback = () => {
    this.setState({ authorized: true })
  }

  handlerType = () => {
    this.setState({
      matches: !this.state.matches
    })

    document.querySelector('.header').style.position = this.state.matches
      ? 'fixed'
      : 'relative'
  }

  render() {
    const body = (!this.state.authorized && (
      <React.Fragment>
        <Auth authorizedCallback={this.authorizedCallback} />
      </React.Fragment>
    )) ||
      (this.state.matches && (
        <React.Fragment>
          <Matches />
        </React.Fragment>
      )) || <Cards />

    return (
      <div className="main">
        {this.state.authorized && (
          <Header
            style={{ position: this.state.matches ? 'relative' : 'fixed' }}
            handlerType={this.handlerType}
          />
        )}
        {body}
      </div>
    )
  }
}
