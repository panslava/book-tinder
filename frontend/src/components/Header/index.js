import React from 'react'

import './style.css'

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="trig">
          <font>Подборка</font>
          <label className="switch">
            <input type="checkbox" onChange={this.props.handlerType} />
            <span className="slider round" />
          </label>
          <font>Карта</font>
        </div>
        <div onClick={this.props.handlerTime}>
          <i className="fas fa-calendar-week" />
        </div>
      </div>
    )
  }
}
