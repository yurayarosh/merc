export default function toggleTypesTitles() {
  if (!this.typesTitles || !this.typesTitles.length) return

  const titleNode = document.createElement('div')
  titleNode.className = 'tabs__tabs-type-title'

  this.typesTitles.forEach(title => {
    const { top } = title.getBoundingClientRect()
    const clone = titleNode.cloneNode(true)
    const currentTitle = this.tabsButtonsWraper.querySelector('.tabs__tabs-type-title')

    clone.innerHTML = title.innerHTML

    // console.log(clone === currentTitle)

    // if (top <= 0 && title !== currentTitle) {
    //   this.tabsButtonsWraper.appendChild(clone)
    // }
  })
}
