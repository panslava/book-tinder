import React from 'react'

import { server } from '../../params'

import './style.css'

export default class Matches extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    return (
      <div className="Matches">
        <div className="Match" align="center">
          <img
            className="avatar"
            src={server.host + '/static/avatars/admarkov.jpeg'}
            alt="MatchAvatar"
          />
          <h2 className="displayName">Александр Марков</h2>
          <table>
            <tbody>
              <tr>
                <td style={{ borderRight: 'solid 1px #808080' }}>
                  <ul>
                    <li>Атлант расправил плечи</li>
                    <li>Портрет художника в юности</li>
                    <li>Оно</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>Страдания юного Вертера</li>
                    <li>Над пропастью во ржи</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="tgButton">
            Написать <i className="fab fa-telegram" aria-hidden="true" />
          </div>
        </div>
      </div>
    )
  }
}
