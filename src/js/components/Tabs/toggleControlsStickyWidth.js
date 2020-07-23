export default function toggleControlsStickyWidth() {
  if (window.matchMedia('(min-width: 1200px)').matches) return

  const { top } = this.wrap.getBoundingClientRect()

  if (top <= 0) {
    this.tabsButtonsWraper.classList.add('tabs__tabs--fixed')
    this.tabsTypeTitle.classList.add('tabs__tabs-type-title--fixed')
    this.typesWrapper.classList.add('tabs__types--fixed')
  } else {
    this.tabsButtonsWraper.classList.remove('tabs__tabs--fixed')
    this.tabsTypeTitle.classList.remove('tabs__tabs-type-title--fixed')
    this.typesWrapper.classList.remove('tabs__types--fixed')
  }
}
