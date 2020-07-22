import { CARDS_TO_SHOW, TRANSITION_DURATION } from './constants'
import Card from './htmlComponents/Card'
import Button from './htmlComponents/Button'
import { auxButtons, LANGUAGE, types } from './translations'

export default function renderContent(state = { sliceList: false }) {
  return new Promise(resolve => {
    const stringifyList = list =>
      list.length > 0
        ? list
            .map(({ isFirstOfType, title, url, info, image, type }) => {
              return `
              ${
                isFirstOfType ? `<div class="tabs__group-title">${types[type][LANGUAGE]}</div>` : ''
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
      this.visiblePosts = shouldSliceList
        ? [...this.listData].slice(0, CARDS_TO_SHOW)
        : [...this.listData]

      const postsList = stringifyList(this.visiblePosts)

      const postsListWithShowButton = postsList + Button({ title: auxButtons.show[LANGUAGE] })

      inner = shouldSliceList ? postsListWithShowButton : postsList
    } else {
      inner = stringifyList(this.listData)
      // +
      // Button({
      //   mod: 'checked js-hide',
      //   title: auxButtons.hide[LANGUAGE],
      // })
    }

    this.content.style.opacity = 0

    setTimeout(() => {
      this.content.innerHTML = inner
      this.content.style.opacity = 1

      this.initSliders()

      this.pushUrl()

      this.typesTitles = [...document.querySelectorAll('.tabs__group-title')]

      resolve()
    }, TRANSITION_DURATION)
  })
}
