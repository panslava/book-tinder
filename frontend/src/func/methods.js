import { getCards } from './api'

// Получить карточки

export async function getAllCards(that, params = { considerGender: 'no' }) {
  let res = await getCards(params)
  let allCards = res.data.books
  allCards = allCards.map(el => {
    let obj = {
      ...el,
      random_id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
    }
    return obj
  })
  let currentCards = allCards.slice(0, 15)
  allCards = allCards.slice(15, allCards.length)
  // console.log(currentCards)
  that.setState({ allCards: allCards, currentCards: currentCards })
}
