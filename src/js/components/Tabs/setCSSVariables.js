export default function setCSSVariables() {
  function outerHeight(el) {
    let height = el.offsetHeight

    const { marginTop, marginBottom } = window.getComputedStyle(el)

    height += parseInt(marginTop, 10) + parseInt(marginBottom, 10)
    return height
  }

  const typesWrapperWidth = this.typesWrapper ? this.typesWrapper.offsetWidth : 0
  const typesWrapperHeight = this.typesWrapper ? outerHeight(this.typesWrapper) : 0
  const tabsButtonsWrapperHeight = this.tabsButtonsWraper ? outerHeight(this.tabsButtonsWraper) : 0

  document.documentElement.style.setProperty('--types-wrapper-width', `${typesWrapperWidth}px`)
  document.documentElement.style.setProperty('--types-wrapper-height', `${typesWrapperHeight}px`)
  document.documentElement.style.setProperty(
    '--tabs-buttons-wrapper-height',
    `${tabsButtonsWrapperHeight}px`
  )
}
