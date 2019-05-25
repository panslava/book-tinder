import React from 'react'

import './style.css'
import { getCard } from '../../func/methods'
import Card from '../Card'

export default class Cards extends React.Component {
  state = {
    cards: []
  }

  // componentWillMount() {
  // }

  async componentDidMount() {
    getCard(this)
  }

  render() {
    return (
      <div>
        {/* JSON.stringify(this.state.cards) */}
        <div className="tinder">
          <div className="tinder--status">
            <i className="fa fa-remove" />
            <i className="fa fa-check" />
          </div>

          <div className="tinder--cards">
            {this.state.cards.map((res, i) => {
              console.log(1)
              return (
                <Card
                  title={res.title}
                  author={res.author}
                  description={res.description}
                  key={i}
                />
              )
            })}
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
