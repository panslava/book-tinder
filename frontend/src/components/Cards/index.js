import React from 'react'

import './style.css'
import { getAllCards } from '../../func/methods'
import Card from '../Card'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCards: [],
      allCards: []
    }
  }

  componentDidMount() {
    let tinderContainer = document.querySelector('.tinder')
    getAllCards(this)
    tinderContainer.classList.add('loaded')
  }

  removeTopCard() {
    console.log(2)
    let currentCards = this.state.currentCards
    let allCards = this.state.allCards

    currentCards.shift()
    if (allCards && allCards.length) {
      currentCards.push(allCards[0])
      allCards.shift()
    }
    // console.log(currentCards)
    this.setState({
      currentCards: currentCards,
      allCards: allCards
    })
    // console.log(this.state.currentCards)
  }

  handleLoveButtonClick(event) {
    let love = true
    let cards = document.querySelectorAll('.tinder--card:not(.removed)')
    let moveOutWidth = document.body.clientWidth * 1.5

    if (!cards.length) return false

    let card = cards[0]

    if (love) {
      card.style.transform =
        'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'
    } else {
      card.style.transform =
        'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)'
    }

    this.removeTopCard()

    event.preventDefault()
  }

  handleNopeButtonClick(event) {
    let love = false
    let cards = document.querySelectorAll('.tinder--card:not(.removed)')
    let moveOutWidth = document.body.clientWidth * 1.5

    if (!cards.length) return false

    let card = cards[0]

    if (love) {
      card.style.transform =
        'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'
    } else {
      card.style.transform =
        'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)'
    }

    this.removeTopCard()

    event.preventDefault()
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
            {this.state.currentCards.map((res, i) => {
              return (
                <Card
                  id={res.random_id}
                  removeTopCard={this.removeTopCard.bind(this)}
                  title={res.title}
                  author={res.author}
                  description={res.description}
                  pic={res.pic}
                  key={res.random_id}
                  style={{
                    zIndex: this.state.allCards.length - i,
                    transform:
                      'scale(' +
                      (20 - i) / 20 +
                      ') translateY(-' +
                      30 * i +
                      'px)',
                    opacity: (10 - i) / 10
                  }}
                />
              )
            })}
          </div>

          <div className="tinder--buttons">
            <button onClick={this.handleNopeButtonClick.bind(this)} id="nope">
              <i className="fa fa-remove" />
            </button>
            <button onClick={this.handleLoveButtonClick.bind(this)} id="love">
              <i className="fa fa-check" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
