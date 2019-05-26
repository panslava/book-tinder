import React from 'react'

import { getMatches } from '../../func/api'
import Match from '../Match'

import './style.css'

export default class Matches extends React.Component {
  constructor(props) {
    super(props)

    this.state = { matches: [] }
    this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    let matches = (await getMatches()).data.matches
    console.log(matches)
    this.setState({ matches: matches })
    console.log(matches)
  }
  render() {
    return (
      <div style={{ height: '100vh', overflow: 'scroll' }}>
        {this.state.matches.map((res, i) => {
          console.log(res)
          return (
            <Match
              key={i}
              iLiked={res.books.iLiked}
              matchLiked={res.books.matchLiked}
              matchUser={res.user}
            />
          )
        })}
      </div>
    )
  }
}
