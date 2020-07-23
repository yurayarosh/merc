import classNames from '../../../classNames'

export default ({ isActive, title, group }) =>
  `<button
      class="tabs__tab${isActive ? ' tabs__tab--current' : ''} ${classNames.tabs.tab}"
      type="button"
      data-filter="${group}"
    >${title}</button>
  `
