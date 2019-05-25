import React from 'react'

import './style.css'
import { getCard } from '../../func/methods'
import Card from '../Card'

export default class Cards extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    getCard(this, { count: 15 })
  }

  render() {
    return (
      <div>
        <div className="tinder">
          <div className="tinder--status">
            <i className="fa fa-remove" />
            <i className="fa fa-check" />
          </div>

          <div className="tinder--cards">
            {this.state.cards.map((res, i) => (
              <Card name={res.name} key={i} />
            ))}
          </div>

          <div className="tinder--buttons">
            <button id="nope">
              <i className="fa fa-remove" />
            </button>
            <button id="love">
              <i className="fa fa-check" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
