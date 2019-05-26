import React from 'react'

import { server } from '../../params'

import './style.css'

export default class Match extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      // <div />
      <div className="Matches">
        <div className="Match" align="center">
          <img
            className="avatar"
            src={server.host + this.props.matchUser.avatar}
            alt="MatchUserAvatar"
          />
          <h2 className="displayName">{this.props.matchUser.displayName}</h2>
          <table>
            <tbody>
              <tr>
                <td style={{ borderRight: 'solid 1px #808080' }}>
                  <ul>
                    {this.props.matchLiked.map((value, i) => {
                      return <li key={i}>{value.title}</li>
                    })}
                  </ul>
                </td>
                <td>
                  <ul>
                    {this.props.iLiked.map((value, i) => {
                      return <li key={i}>{value.title}</li>
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="tgButton">
            Написать <i className="fab fa-telegram" aria-hidden="true" />
          </button>
        </div>
      </div>
    )
  }
}
