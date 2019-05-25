import React from 'react'

import './style.css'
import Header from '../Header'
// import Search from '../Search'
import Cards from '../Cards'

export default class App extends React.Component {
  state = {
    maps: false,
    search: '',
    markers: '',
    timeline: false
  }

  render() {
    const body = <Cards />

    return (
      <div className="main">
        {this.state.markers}
        <Header handlerType={this.handlerType} handlerTime={this.handlerTime} />
        {body}
      </div>
    )
  }
}
