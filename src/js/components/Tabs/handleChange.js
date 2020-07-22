export default function handleChange({ target }) {
  const typeBtn = target.closest('.js-tabs-type-button')

  if (typeBtn) {
    const elseCheckboxes = this.typeButtons.filter(input => input !== typeBtn)

    elseCheckboxes.forEach(input => {
      input.checked = false
    })

    const type = typeBtn.checked ? typeBtn.value : ''

    this.filterList({
      type,
      group: this.currentGroupName,
    })
    this.renderContent()
  }
}
