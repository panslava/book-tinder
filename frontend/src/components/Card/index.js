import React from 'react'

import './style.css'

export default class Card extends React.Component {
  render() {
    return (
      <div className="tinder--card">
        <h3>{this.props.name}</h3>
        <div>
          <div className="inline">
            <i className="fas fa-map-marker-alt" />
            ????? ???? ?????????? {Math.floor(Math.random() * 100)}
          </div>
        </div>
        <div>
          <div className="inline">
            <i className="fas fa-calendar-week" />
            ????? ???? ?????
          </div>
        </div>
      </div>
    )
  }
}
