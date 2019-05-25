import React from 'react'

import './style.css'
import { server } from '../../params'

export default class Card extends React.Component {
  render() {
    return (
      <div className="tinder--card">
        <img src={server.ip + '/' + this.props.link} alt="??????????? ?????" />
        <h3>{this.props.title}</h3>
        <div>
          <div className="inline">
            <i className="fas fa-map-marker-alt" />
            {this.props.author}
          </div>
        </div>
        <div>
          <div className="inline">
            <i className="fas fa-calendar-week" />
            {this.props.description}
          </div>
        </div>
      </div>
    )
  }
}
