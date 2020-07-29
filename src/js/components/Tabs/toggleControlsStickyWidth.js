export default function toggleControlsStickyWidth() {
  if (window.matchMedia('(min-width: 1200px)').matches) return

  const { top } = this.wrap.getBoundingClientRect()

  if (top <= 0) {
    if (this.tabsButtonsWraper) this.tabsButtonsWraper.classList.add('tabs__tabs--fixed')
    if (this.tabsTypeTitle) this.tabsTypeTitle.classList.add('tabs__tabs-type-title--fixed')
    if (this.typesWrapper) this.typesWrapper.classList.add('tabs__types--fixed')
  } else {
    if (this.tabsButtonsWraper) this.tabsButtonsWraper.classList.remove('tabs__tabs--fixed')
    if (this.tabsTypeTitle) this.tabsTypeTitle.classList.remove('tabs__tabs-type-title--fixed')
    if (this.typesWrapper) this.typesWrapper.classList.remove('tabs__types--fixed')
  }
}
