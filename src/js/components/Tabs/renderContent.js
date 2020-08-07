import { CARDS_TO_SHOW, TRANSITION_DURATION, LANGUAGE } from './constants'
import Card from './htmlComponents/Card'
import Button from './htmlComponents/Button'

export default function renderContent(state = { sliceList: false }) {
  return new Promise(resolve => {
    const {
      translations: { types, auxButtons },
    } = this.store

    const stringifyList = list =>
      list.length > 0
        ? list
            .map(({ isFirstOfType, isRecommended, title, url, price, image, type, labels }) => {
              return `
              ${
                isFirstOfType
                  ? `<div class="models-tabs__group-title">${
                      isRecommended ? types.recommended[LANGUAGE] : types[type][LANGUAGE]
                    }</div>`
                  : ''
              }
              ${Card({
                isFirstOfType,
                title,
                url,
                price,
                image,
                type,
                labels,
                reverseLinks: this.reverseCardsLinks,
              })}
              `
            })
            .join('')
        : []

    let inner
    const { list: listData } = this.store

    if (state.sliceList) {
      const shouldSliceList = listData.length > CARDS_TO_SHOW
      this.visibleCards = shouldSliceList ? listData.slice(0, CARDS_TO_SHOW) : listData

      const cardsList = stringifyList(this.visibleCards)

      const cardListWithShowButton =
        cardsList + Button({ title: auxButtons ? auxButtons.show[LANGUAGE] : '' })

      inner = shouldSliceList ? cardListWithShowButton : cardsList
    } else {
      inner = stringifyList(listData)
    }

    const appendInner = (props = {}) => {
      const { animate = false } = props

      this.content.innerHTML = inner
      if (animate) this.content.style.opacity = 1

      this.initSliders()

      if (!this.options.isSimple) this.pushUrl()

      this.typesTitles = [...document.querySelectorAll('.models-tabs__group-title')]

      resolve()
    }

    if (TRANSITION_DURATION > 0) {
      this.content.style.opacity = 0
      setTimeout(appendInner.bind({ animate: true }), TRANSITION_DURATION)
    } else {
      appendInner()
    }
  })
}
