export default function handleTabButtonClick(btn) {
  const {
    dataset: { filter },
  } = btn

  this.filterList({
    group: filter,
  })

  this.renderTypeButtons()

  // Filter with types attribute after all types buttons were rendered.
  this.filterList({
    group: filter,
    type: this.currentTypeName,
  })

  this.toggleTabsState(btn)
  this.renderContent()
}
