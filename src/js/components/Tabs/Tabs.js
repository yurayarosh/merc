// let infoList = models.map(card => {
//   return {
//       "group": card.querySelector('.info--name') ? card.querySelector('.info--name').innerText.includes('AMG') ? card.querySelector('.info--name').innerText : '' : '',
//       "type": "sedan",
//       "title": {
//         "card": card.querySelector('.title--two').innerText,
//       },
//       "url": {
//         "main": card.querySelector('.image').getAttribute('href'),
//         "auxiliary": card.querySelectorAll('.valign').length >= 2 ? card.querySelectorAll('.valign')[1].getAttribute('href') : '',
//       },
//       "img": {
//         "name": card.querySelector('img').getAttribute('src').split('/').filter(str => str.includes('.png')),
//         "alt": card.querySelector('img').getAttribute('alt'),
//       },
//       "info": {
//         "ru": {
//           "note": "Розничная цена",
//           "name": "C-Class седаны",
//           "price": "от 824 946 ₴",
//         },
//         "uk": {
//           "note": card.querySelector('.info--note') ? card.querySelector('.info--note').innerText : '',
//           "name": card.querySelector('.info--naem') ? card.querySelector('.info--name').innerText : '',
//           "price": card.querySelector('.info--price') ? card.querySelector('.info--price').innerText : '',
//         }
//       }
//   }
// })

import toggleTabsState from './toggleTabsState'
import filterList from './filterList'
import pushUrl from './pushUrl'
import initSliders from '../initSliders'

import handleLoading from './handleLoading'
import handleTabButtonClick from './handleTabsButtonClick'
import handleShowMoreButtonClick from './handleShowMoreButtonClick'
import handleClick from './handleClick'
import handleHideButtonClick from './handleHideButtonClick'
import handleChange from './handleChange'

import renderWrappers from './renderWrappers'
import renderContent from './renderContent'
import renderTypeButtons from './renderTypeButtons'
import renderTabsButtons from './renderTabsButtons'

import { QUERY_GROUP, TRANSITION_DURATION, FETCHED_LIST_URL, QUERY_TYPE } from './constants'

export default class Tabs {
  constructor(wrap) {
    this.wrap = wrap
    this.isLoaded = false

    this.handleLoading = handleLoading.bind(this)
    this.toggleTabsState = toggleTabsState.bind(this)
    this.filterList = filterList.bind(this)
    this.pushUrl = pushUrl.bind(this)
    this.initSliders = initSliders.bind(this)

    this.handleTabButtonClick = handleTabButtonClick.bind(this)
    this.handleShowMoreButtonClick = handleShowMoreButtonClick.bind(this)
    this.handleHideButtonClick = handleHideButtonClick.bind(this)
    this.handleClick = handleClick.bind(this)
    this.handleChange = handleChange.bind(this)

    this.renderWrappers = renderWrappers.bind(this)
    this.renderContent = renderContent.bind(this)
    this.renderTypeButtons = renderTypeButtons.bind(this)
    this.renderTabsButtons = renderTabsButtons.bind(this)
  }

  get buttons() {
    return [...this.wrap.querySelectorAll('.js-tabs-tab')]
  }

  get typeButtons() {
    return [...this.wrap.querySelectorAll('.js-tabs-type-button')]
  }

  get currentTypeButton() {
    return this.typeButtons.filter(({ checked }) => checked)[0]
  }

  get currentButton() {
    return this.buttons.filter(({ classList }) => classList.contains('tabs__tab--current'))[0]
  }

  get baseUrl() {
    let {
      location: { href },
    } = window

    const changedHref = href.slice(0, href.indexOf(QUERY_GROUP) - 1)

    href = href.indexOf(QUERY_GROUP) !== -1 ? changedHref : href

    return href
  }

  get currentGroupName() {
    const {
      location: { href },
    } = window

    const getNameFromButton = () => {
      return this.currentButton.dataset.filter
    }

    const getNameFromUrl = () => {
      const sliceStartPoint = href.indexOf(QUERY_GROUP) + QUERY_GROUP.length
      const sliceEndPoint =
        href.indexOf(QUERY_TYPE) !== -1 ? href.indexOf(QUERY_TYPE) - 1 : undefined

      return href.slice(sliceStartPoint, sliceEndPoint)
    }

    const name =
      !this.isLoaded && href.indexOf(QUERY_GROUP) !== -1 ? getNameFromUrl() : getNameFromButton()

    return name
  }

  get currentTypeName() {
    const {
      location: { href },
    } = window

    const getNameFromButton = () => {
      if (this.currentTypeButton) return this.currentTypeButton.value
      return ''
    }

    const getNameFromUrl = () => {
      const sliceStartPoint = href.indexOf(QUERY_TYPE) + QUERY_TYPE.length
      return href.slice(sliceStartPoint)
    }

    const name =
      !this.isLoaded && href.indexOf(QUERY_TYPE) !== -1 ? getNameFromUrl() : getNameFromButton()

    return name
  }

  async _getListData() {
    const listResponse = await fetch(FETCHED_LIST_URL)
    const listData = await listResponse.json()

    this.originListData = listData && listData.length > 0 ? listData : []
    this.listData = [...this.originListData]
  }

  async _onLoad() {
    this.renderWrappers()
    this.renderTabsButtons()

    this.content.style.transition = `opacity ${TRANSITION_DURATION}ms`
    await this.handleLoading()

    this.isLoaded = true
  }

  _addListeners() {
    this.onClick = this.handleClick.bind(this)
    this.onChange = this.handleChange.bind(this)

    document.addEventListener('click', this.onClick)
    document.addEventListener('change', this.onChange)
  }

  async init() {
    await this._getListData()
    this._onLoad()
    this._addListeners()
  }
}
