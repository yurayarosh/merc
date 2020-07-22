import { QUERY_GROUP } from './constants'

export default async function handleLoading() {
  const {
    location: { href },
  } = window

  const [currentButton] = this.buttons.filter(
    ({ dataset: { filter } }) => filter === this.currentGroupName
  )

  this.toggleTabsState(currentButton)

  const IS_ALL_ITEMS = this.currentGroupName === this.buttons[0].dataset.filter

  if (href.indexOf(QUERY_GROUP) !== -1) {
    if (IS_ALL_ITEMS) {
      this.renderTypeButtons()
      this.filterList({
        type: this.currentTypeName,
      })
    } else {
      this.filterList({
        group: this.currentGroupName,
      })
      this.renderTypeButtons()
      this.filterList({
        group: this.currentGroupName,
        type: this.currentTypeName,
      })
    }
  } else {
    this.renderTypeButtons()
  }

  await this.renderContent()
}
