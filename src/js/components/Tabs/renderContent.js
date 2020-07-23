import { CARDS_TO_SHOW, TRANSITION_DURATION } from './constants'
import Card from './htmlComponents/Card'
import Button from './htmlComponents/Button'
import { auxButtons, LANGUAGE, types } from './translations'

export default function renderContent(state = { sliceList: false }) {
  return new Promise(resolve => {
    const stringifyList = list =>
      list.length > 0
        ? list
            .map(({ isFirstOfType, isRecommended, title, url, info, image, type }) => {
              return `
              ${
                isFirstOfType
                  ? `<div class="tabs__group-title">${
                      isRecommended ? types.recommended[LANGUAGE] : types[type][LANGUAGE]
                    }</div>`
                  : ''
              }
              ${Card({
                isFirstOfType,
                title,
                url,
                info,
                image,
                type,
              })}
              `
            })
            .join('')
        : []

    let inner

    if (state.sliceList) {
      const shouldSliceList = this.listData.length > CARDS_TO_SHOW
      this.visibleCards = shouldSliceList
        ? [...this.listData].slice(0, CARDS_TO_SHOW)
        : [...this.listData]

      const cardsList = stringifyList(this.visibleCards)

      const cardListWithShowButton = cardsList + Button({ title: auxButtons.show[LANGUAGE] })

      inner = shouldSliceList ? cardListWithShowButton : cardsList
    } else {
      inner = stringifyList(this.listData)
      // +
      // Button({
      //   mod: 'checked js-hide',
      //   title: auxButtons.hide[LANGUAGE],
      // })
    }

    const appendInner = (props = {}) => {
      const { animate = false } = props

      this.content.innerHTML = inner
      if (animate) this.content.style.opacity = 1

      this.initSliders()

      this.pushUrl()

      this.typesTitles = [...document.querySelectorAll('.tabs__group-title')]

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
