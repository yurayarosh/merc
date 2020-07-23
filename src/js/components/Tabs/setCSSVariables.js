export default function setCSSVariables() {
  function outerHeight(el) {
    let height = el.offsetHeight

    const { marginTop, marginBottom } = window.getComputedStyle(el)

    height += parseInt(marginTop, 10) + parseInt(marginBottom, 10)
    return height
  }

  const typesWrapperWidth = this.typesWrapper.offsetWidth
  const typesWrapperHeight = outerHeight(this.typesWrapper)
  const tabsButtonsWrapperHeight = outerHeight(this.tabsButtonsWraper)

  document.documentElement.style.setProperty('--types-wrapper-width', `${typesWrapperWidth}px`)
  document.documentElement.style.setProperty('--types-wrapper-height', `${typesWrapperHeight}px`)
  document.documentElement.style.setProperty(
    '--tabs-buttons-wrapper-height',
    `${tabsButtonsWrapperHeight}px`
  )
}
