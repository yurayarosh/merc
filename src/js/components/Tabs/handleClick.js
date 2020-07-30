import classNames from './classNames'

export default function handleClick({ target }) {
  const tabBtn = target.closest(`.${classNames.tab}`)
  const showMoreBtn = target.closest('.js-show-more')
  const hideBtn = target.closest('.js-hide')
  const selectOpener = target.closest(`.${classNames.select} .tabs-select__opener`)
  const select = document.querySelector(`.${classNames.select}`)

  if (tabBtn) this.handleTabButtonClick(tabBtn)
  if (showMoreBtn) this.handleShowMoreButtonClick(showMoreBtn)
  if (hideBtn) this.handleHideButtonClick(hideBtn)
  if (selectOpener) this.handleSelectOpenerClick(selectOpener)

  if (select && !selectOpener) {
    select.classList.remove('tabs-select--open')
  }
}
