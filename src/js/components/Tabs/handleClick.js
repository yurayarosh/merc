export default function handleClick({ target }) {
  const tabBtn = target.closest('.js-tabs-tab')
  const showMoreBtn = target.closest('.js-show-more')
  const hideBtn = target.closest('.js-hide')

  if (tabBtn) this.handleTabButtonClick(tabBtn)
  if (showMoreBtn) this.handleShowMoreButtonClick(showMoreBtn)
  if (hideBtn) this.handleHideButtonClick(hideBtn)
}
