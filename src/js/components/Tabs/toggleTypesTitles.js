export default function toggleTypesTitles() {
  if (!this.typesTitles || !this.typesTitles.length) return

  const getTitleNode = () => this.wrap.querySelector('.tabs__tabs-type-title')

  const activeTitles = []

  this.typesTitles.forEach(title => {
    const { top } = title.getBoundingClientRect()
    const tabsHeight = this.tabsButtonsWraper ? this.tabsButtonsWraper.offsetHeight : 0
    const typesHeight = this.typesWrapper ? this.typesWrapper.offsetHeight : 0

    const OFFSET = window.matchMedia('(min-width: 1200px)').matches
      ? tabsHeight
      : tabsHeight + typesHeight

    if (top <= OFFSET) activeTitles.push(title)
  })

  const currentGropTitle = activeTitles[activeTitles.length - 1]

  if (currentGropTitle) {
    if (currentGropTitle.innerHTML !== getTitleNode().innerHTML) {
      this.tabsTypeTitle.innerHTML = `
        <span>${currentGropTitle.innerHTML}</span>
      `
    }
  } else if (getTitleNode().innerHTML) {
    this.tabsTypeTitle.innerHTML = ''
  }
}
