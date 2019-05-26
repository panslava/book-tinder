import React from 'react'
import Hammer from 'react-hammerjs'
import posed from 'react-pose'

import { server } from '../../params'
import './style.css'

const Box = posed.div({
  hidden: { opacity: 0.001 },
  visible: { opacity: 1 },
  transition: { duration: 700 }
})

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.handlePan = this.handlePan.bind(this)
    this.handlePanEnd = this.handlePanEnd.bind(this)
    this.state = {
      id: this.props.id,
      isVisible: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: true })
    }, 2000)
  }

  handlePan(event) {
    document.querySelector(`[id='${this.state.id}']`).classList.add('moving')
    if (event.deltaX === 0) return
    if (event.center.x === 0 && event.center.y === 0) return
    let tinderContainer = document.querySelector('.tinder')

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0)
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0)

    let xMulti = event.deltaX * 0.03
    let yMulti = event.deltaY / 80
    let rotate = xMulti * yMulti
    event.target.style.transform =
      'translate(' +
      event.deltaX +
      'px, ' +
      event.deltaY +
      'px) rotate(' +
      rotate +
      'deg)'
  }

  handlePanEnd(event) {
    document.querySelector(`[id='${this.state.id}']`).classList.remove('moving')
    let tinderContainer = document.querySelector('.tinder')

    tinderContainer.classList.remove('tinder_love')
    tinderContainer.classList.remove('tinder_nope')

    let moveOutWidth = document.body.clientWidth
    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5

    if (keep) {
      event.target.style.transform = ''
    } else {
      let endX = Math.max(
        Math.abs(event.velocityX) * moveOutWidth,
        moveOutWidth
      )
      let toX = event.deltaX > 0 ? endX : -endX
      let endY = Math.abs(event.velocityY) * moveOutWidth
      let toY = event.deltaY > 0 ? endY : -endY
      let xMulti = event.deltaX * 0.03
      let yMulti = event.deltaY / 80
      let rotate = xMulti * yMulti
      let isLike = false
      if (toX > 0) {
        isLike = true
      }
      event.target.style.transform =
        'translate(' +
        toX +
        'px, ' +
        (toY + event.deltaY) +
        'px) rotate(' +
        rotate +
        'deg)'

      this.props.removeTopCard(isLike, this.props.db_id)
    }
  }
  render() {
    return (
      <Hammer onPan={this.handlePan} onPanEnd={this.handlePanEnd}>
        <Box
          id={this.props.id}
          style={this.props.style}
          className="tinder--card"
          pose={this.state.isVisible ? 'visible' : 'hidden'}
        >
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
        </Box>
      </Hammer>
    )
  }
}
