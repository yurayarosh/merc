export default function renderWrappers() {
  this.wrap.innerHTML = `
      <div class="tabs__tabs"></div>

      <div class="tabs__tabs-type-title"></div>

      <div class="tabs__types"></div>

      <div class="tabs__content"></div>
    `
  this.content = this.wrap.querySelector('.tabs__content')
  this.typesWrapper = this.wrap.querySelector('.tabs__types')
  this.tabsButtonsWraper = this.wrap.querySelector('.tabs__tabs')
  this.tabsTypeTitle = this.wrap.querySelector('.tabs__tabs-type-title')
}
