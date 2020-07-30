import TabsButton from './htmlComponents/TabsButton'
import { LANGUAGE } from './constants'
import classNames from './classNames'

export default function renderTabsButtons() {
  const {
    originList,
    translations: { groupsNames },
  } = this.store

  const newModels = [...originList].filter(({ labels }) => labels && labels.new)

  const getGroupNamesList = list => {
    let newList = [...new Set(list.map(({ group }) => group))]

    newList = [...new Set(newList.flat(1))]
    return newList
  }

  const groupNamesArr =
    newModels.length > 0 ? [...getGroupNamesList(originList), 'new'] : getGroupNamesList(originList)

  const groups = originList.length > 0 ? groupNamesArr : []

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

    return `
      <li>
        ${TabsButton({ isActive, group, title })}
      </li>
    `
  }

  const stringifyList = list => list.map(getButton).join('')
  const getButtonsTemplate = stringifyList(groups)

  this.tabsButtonsWraper.innerHTML = `
      <div class="tabs-select ${classNames.select}">
        <button type="button" class="tabs-select__opener">${activeButtonText}</button>
        <ul class="tabs-select__panel">
          ${getButtonsTemplate}
        </ul>
      </div>
  `
}
