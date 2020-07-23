import { throttle, debounce } from 'throttle-debounce'

import toggleTabsState from './toggleTabsState'
import filterList from './filterList'
import pushUrl from './pushUrl'
import initSliders from './initSliders'
import toggleTypesTitles from './toggleTypesTitles'
import setCSSVariables from './setCSSVariables'
import toggleControlsStickyWidth from './toggleControlsStickyWidth'

import handleLoading from './handleLoading'
import handleTabButtonClick from './handleTabsButtonClick'
import handleShowMoreButtonClick from './handleShowMoreButtonClick'
import handleClick from './handleClick'
import handleHideButtonClick from './handleHideButtonClick'
import handleSelectOpenerClick from './handleSelectOpenerClick'
import handleChange from './handleChange'
import handleScroll from './handleScroll'
import handleResize from './handleResize'

import renderWrappers from './renderWrappers'
import renderContent from './renderContent'
import renderTypeButtons from './renderTypeButtons'
import renderTabsButtons from './renderTabsButtons'

import { QUERY_GROUP, TRANSITION_DURATION, FETCHED_LIST_URL, QUERY_TYPE } from './constants'
import classes from '../../classNames'

const { tabs: classNames } = classes

export default class Tabs {
  constructor(wrap) {
    this.wrap = wrap
    this.isLoaded = false

    this.handleLoading = handleLoading
    this.toggleTabsState = toggleTabsState
    this.filterList = filterList
    this.pushUrl = pushUrl
    this.initSliders = initSliders
    this.toggleTypesTitles = toggleTypesTitles
    this.setCSSVariables = setCSSVariables
    this.toggleControlsStickyWidth = toggleControlsStickyWidth

    this.handleTabButtonClick = handleTabButtonClick
    this.handleShowMoreButtonClick = handleShowMoreButtonClick
    this.handleHideButtonClick = handleHideButtonClick
    this.handleSelectOpenerClick = handleSelectOpenerClick
    this.handleClick = handleClick
    this.handleChange = handleChange
    this.handleScroll = handleScroll
    this.handleResize = handleResize

    this.renderWrappers = renderWrappers
    this.renderContent = renderContent
    this.renderTypeButtons = renderTypeButtons
    this.renderTabsButtons = renderTabsButtons
  }

  get buttons() {
    return [...this.wrap.querySelectorAll(`.${classNames.tab}`)]
  }

  get typeButtons() {
    return [...this.wrap.querySelectorAll(`.${classNames.typeBtn}`)]
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

    return !this.isLoaded && href.indexOf(QUERY_GROUP) !== -1
      ? getNameFromUrl()
      : getNameFromButton()
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

    return !this.isLoaded && href.indexOf(QUERY_TYPE) !== -1
      ? getNameFromUrl()
      : getNameFromButton()
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

    if (TRANSITION_DURATION > 0) this.content.style.transition = `opacity ${TRANSITION_DURATION}ms`
    if (TRANSITION_DURATION > 0)
      this.typesWrapper.style.transition = `opacity ${TRANSITION_DURATION}ms`

    await this.handleLoading()

    this.setCSSVariables()

    this.isLoaded = true
  }

  _addListeners() {
    this.onClick = this.handleClick.bind(this)
    this.onChange = this.handleChange.bind(this)
    this.onScroll = throttle(66, this.handleScroll.bind(this))
    this.onResize = debounce(300, this.handleResize)

    document.addEventListener('click', this.onClick)
    document.addEventListener('change', this.onChange)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
  }

  async init() {
    await this._getListData()
    this._onLoad()
    this._addListeners()
  }
}
