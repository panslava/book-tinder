import React from 'react'

import './style.css'
import { getAllCards } from '../../func/methods'
import { like } from '../../func/api'
import Card from '../Card'
import Match from '../Match'

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
      show: false,
      showMatch: false,
      res: {}
    }
    setTimeout(this.show.bind(this), 2500)
  }

  show = () => {
    if (this.state.currentCards.length) this.setState({ show: true })
    else {
      setTimeout(this.show.bind(this), 2500)
    }
  }

  componentDidMount() {
    let tinderContainer = document.querySelector('.tinder')
    getAllCards(this)
    tinderContainer.classList.add('loaded')
  }

  removeTopCard = async (isLike, db_id) => {
    if (this.state.showMatch) return
    if (isLike) {
      let res = await like({ book: db_id })
      console.log(res.data)
      if ('match' in res.data) {
        this.setState({ res: res.data.match, showMatch: true })
      }
      // this.setState({
      //   res: {
      //     user: {
      //       uid: 3,
      //       nickname: 'savva',
      //       displayName: 'Савва Антонюк',
      //       gender: 'male',
      //       birthday: '1995-08-24',
      //       avatar: '/static/avatars/savva.jpeg',
      //       age: 23,
      //       hash: 'djhg8298gidkgjj93jfd',
      //       tg: 'SavvaAnto'
      //     },
      //     books: {
      //       iLiked: [
      //         {
      //           id: 15,
      //           title: 'Труженики моря',
      //           author: 'Виктор Гюго',
      //           description:
      //             'роман Виктора Гюго, написан во время изгнания поэта на острове Гернси, опубликован в 1866 году. В произведении описывается подвиг рыбака, ценой неимоверных лишений победившего в борьбе с силами природы, но отказавшегося от вознаграждения за эту победу ради любви.',
      //           pic: '/static/books/sea.jpeg'
      //         }
      //       ],
      //       matchLiked: [
      //         {
      //           id: 7,
      //           title: 'Гарри Поттер и методы рационального мышления',
      //           author: 'Элиезер Юдковский',
      //           description:
      //             'Петуния вышла замуж не за Дурсля, а за университетского профессора, и Гарри попал в гораздо более благоприятную среду. У него были частные учителя, дискуссии с отцом, а главное — книги, сотни и тысячи научных и фантастических книг. В 11 лет Гарри знаком с квантовой механикой, когнитивной психологией, теорией вероятностей и другими вещами. Но Гарри не просто вундеркинд, у него есть загадочная Тёмная сторона, которая явно накладывает свой отпечаток на его мышление.',
      //           pic: '/static/books/harry.jpeg'
      //         }
      //       ]
      //     }
      //   },
      //   showMatch: true
      // })
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

  closeMatch = () => {
    this.setState({ res: {}, showMatch: false })
  }

  handleLoveButtonClick(event) {
    if (this.state.showMatch) return
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

    this.removeTopCard(true)

    event.preventDefault()
  }

  handleNopeButtonClick(event) {
    if (this.state.showMatch) return

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
            {this.state.show && this.state.res && this.state.res.books && (
              <div style={{ maxWidth: '400px', opacity: '0.95', zIndex: 5000 }}>
                <div
                  style={{
                    marginBottom: '-60px',
                    marginLeft: '35px'
                  }}
                  onClick={this.closeMatch}
                >
                  <i className="fas fa-times closeMatch" />
                </div>
                <Match
                  iLiked={this.state.res.books.iLiked}
                  matchLiked={this.state.res.books.matchLiked}
                  matchUser={this.state.res.user}
                  show={this.state.showMatch}
                />
                <div className="matchTitle">It's a match</div>
              </div>
            )}
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
