export default ({ isActive, title, group }) =>
  `<button
      class="tabs__tab${isActive ? ' tabs__tab--current' : ''} js-tabs-tab"
      type="button"
      data-filter="${group}"
    >${title}</button>
  `
