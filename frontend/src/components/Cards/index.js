import React from 'react'

import './style.css'
import { getAllCards } from '../../func/methods'
import { like } from '../../func/api'
import Card from '../Card'

function Spinner(props) {
  if (props.show) {
    return null
  }

  return (
    <svg
      style={{ position: 'absolute', transform: 'scale(2)', bottom: '50%' }}
      xmlns="http://www.w3.org/2000/svg"
      width="74px"
      height="74px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-infinity"
    >
      <path
        fill="none"
        ng-attr-stroke="{{config.stroke}}"
        ng-attr-stroke-width="{{config.width}}"
        ng-attr-stroke-dasharray="{{config.dasharray}}"
        d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40 C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z"
        stroke="#ff7c81"
        strokeWidth="7"
        strokeDasharray="159.08513549804687 97.50379272460938"
      >
        <animate
          attributeName="stroke-dashoffset"
          calcMode="linear"
          values="0;256.58892822265625"
          keyTimes="0;1"
          dur="1"
          begin="0s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCards: [],
      allCards: [],
      show: false
    }
    setTimeout(this.show.bind(this), 2500)
  }

  show() {
    this.setState({ show: true })
  }

  componentDidMount() {
    let tinderContainer = document.querySelector('.tinder')
    getAllCards(this)
    tinderContainer.classList.add('loaded')
  }

  async removeTopCard(isLike, db_id) {
    if (isLike) {
      let res = await like({ book: db_id })
      console.log(res)
    }
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
                  db_id={res.id}
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
            <Spinner show={this.state.show} />
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
