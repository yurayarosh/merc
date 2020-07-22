import TabsButton from './htmlComponents/TabsButton'
import { groupsNames, LANGUAGE } from './translations'

export default function renderTabsButtons() {
  const groups =
    this.originListData.length > 0
      ? ['all', ...new Set(this.originListData.map(({ group }) => group))]
      : ['all']

  const stringifyList = list =>
    list
      .map((group, index) => {
        let title = ''
        const translationsValues = Object.values(groupsNames)
        const translationsKeys = Object.keys(groupsNames)

        translationsValues.forEach((translation, i) => {
          if (group === translationsKeys[i]) title = translation[LANGUAGE]
        })
        const isActive = index === 0

        return TabsButton({ isActive, group, title })
      })
      .join('')

  this.tabsButtonsWraper.innerHTML = stringifyList(groups)
}
