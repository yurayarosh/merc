import classNames from '../../../classNames'
import { iconAmg, iconMaybach } from '../icons'

export default ({ isActive, title, group }) => {
  let icon = ''
  switch (title) {
    case 'icon-amg':
      icon = iconAmg
      break
    case 'icon-maybach':
      icon = iconMaybach
      break
    default:
      icon = ''
      break
  }

  return `<button
    class="tabs__tab${isActive ? ' tabs__tab--current' : ''} ${classNames.tabs.tab}"
    type="button"
    data-filter="${group}"
  >${icon || title}</button>
  `
}
