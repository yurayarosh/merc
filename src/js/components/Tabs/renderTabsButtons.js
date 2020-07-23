import TabsButton from './htmlComponents/TabsButton'
import { groupsNames, LANGUAGE } from './translations'
import classNames from '../../classNames'

export default function renderTabsButtons() {
  const groups =
    this.originListData.length > 0
      ? ['all', ...new Set([...this.originListData].map(({ group }) => group))]
      : ['all']

  let activeButtonText = ''

  const getButton = (group, index) => {
    let title = ''
    const translationsValues = Object.values(groupsNames)
    const translationsKeys = Object.keys(groupsNames)

    translationsValues.forEach((translation, i) => {
      if (group === translationsKeys[i]) title = translation[LANGUAGE]
    })
    const isActive = index === 0
    if (isActive) activeButtonText = title

    return TabsButton({ isActive, group, title })
  }

  const stringifyList = list => list.map(getButton).join('')
  const getButtonsTemplate = stringifyList(groups)

  this.tabsButtonsWraper.innerHTML = `
      <div class="tabs-select ${classNames.tabs.select}">
        <button class="tabs-select__opener">${activeButtonText}</button>
        <div class="tabs-select__panel">
          ${getButtonsTemplate}
        </div>
      </div>
  `
}
