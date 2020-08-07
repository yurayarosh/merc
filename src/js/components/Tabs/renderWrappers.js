export default function renderWrappers() {
  const inner = this.options.isSimple
    ? `
      <div class="models-tabs__tabs-type-title models-tabs__tabs-type-title--top"></div>
      
      <div class="models-tabs__content models-tabs__content--full"></div>
    `
    : `
    <div class="models-tabs__tabs"></div>

    <div class="models-tabs__tabs-type-title"></div>

    <div class="models-tabs__types"></div>

    <div class="models-tabs__content"></div>
  `

  this.wrap.innerHTML = inner

  this.content = this.wrap.querySelector('.models-tabs__content')
  this.typesWrapper = this.wrap.querySelector('.models-tabs__types')
  this.tabsButtonsWraper = this.wrap.querySelector('.models-tabs__tabs')
  this.tabsTypeTitle = this.wrap.querySelector('.models-tabs__tabs-type-title')
}
