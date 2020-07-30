import classNames from './classNames'

export default function handleChange({ target }) {
  const typeBtn = target.closest(`.${classNames.typeBtn}`)

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
