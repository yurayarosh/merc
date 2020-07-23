export default function toggleTabsState(activeButton) {
  this.buttons.forEach(btn => btn.classList.remove('tabs__tab--current'))
  activeButton.classList.add('tabs__tab--current')

  const selectOpener = this.tabsButtonsWraper.querySelector('.tabs-select__opener')
  selectOpener.innerHTML = activeButton.innerHTML
}
