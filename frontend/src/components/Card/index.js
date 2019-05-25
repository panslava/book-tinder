import React from 'react'

import { server } from '../../params'
import './style.css'

export default class Card extends React.Component {
  render() {
    return (
      <div className="tinder--card">
        <img src={server.host + this.props.pic} alt="Book" />
        <h3>{this.props.title}</h3>
        <div>
          <div className="inline">
            <i className="fas fa-feather-alt" />
            {this.props.author}
          </div>
        </div>
        <div>
          <div className="inline">
            <i className="fas fa-file-alt" />
            {this.props.description}
          </div>
        </div>
      </div>
    )
  }
}
