import { QUERY_GROUP } from './constants'

export default async function handleLoading() {
  if (!this.options.isSimple) {
    const {
      location: { href },
    } = window

    const [currentButton] = this.buttons.filter(
      ({ dataset: { filter } }) => filter === this.currentGroupName
    )

    this.toggleTabsState(currentButton)

    if (href.indexOf(QUERY_GROUP) !== -1) {
      this.filterList({
        group: this.currentGroupName,
      })
      this.renderTypeButtons()
      this.filterList({
        group: this.currentGroupName,
        type: this.currentTypeName,
      })
    } else {
      this.renderTypeButtons()
      this.filterList()
    }
  } else {
    this.filterList()
  }

  await this.renderContent()
}
