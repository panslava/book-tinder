import React from 'react'

import './style.css'
import Header from '../Header'
import Matches from '../Matches'
import Cards from '../Cards'

export default class App extends React.Component {
  state = {
    matches: false,
    markers: ''
  }

  handlerType = () => {
    this.setState({
      matches: !this.state.matches
    })
  }

  render() {
    const body = (this.state.matches && (
      <React.Fragment>
        <Matches />
      </React.Fragment>
    )) || <Cards />

    return (
      <div className="main">
        <Header handlerType={this.handlerType} />
        {body}
      </div>
    )
  }
}
