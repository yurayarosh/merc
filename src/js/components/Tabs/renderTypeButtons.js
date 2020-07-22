import TypeButton from './htmlComponents/TypeButton'
import { types, LANGUAGE } from './translations'

export default function renderTypeButtons() {
  const typesNames =
    this.listData.length > 0 ? [...new Set(this.listData.map(({ type }) => type))] : []

  const stringifyList = list =>
    list
      .map(type => {
        let title = ''
        const translationsValues = Object.values(types)
        const translationsKeys = Object.keys(types)

        translationsValues.forEach((translation, i) => {
          if (type === translationsKeys[i]) title = translation[LANGUAGE]
        })

        let icon = ''

        switch (type) {
          case 'sedan':
            icon = 'limousine'
            break
          case 't-model':
            icon = 't-modell'
            break
          case 'coupe':
            icon = 'coupe'
            break
          case 'cabriolet':
            icon = 'cabriolet'
            break
          case 'suv':
            icon = 'suv'
            break
          case 'roadster':
            icon = 'roadster'
            break
          case 'shooting-brake':
            icon = 'shooting-brake'
            break
          case 'minivan':
            icon = 'minivan'
            break
          default:
            icon = 'limousine'
            break
        }

        const checked = this.currentTypeName === type
        return `
          <li>
            ${TypeButton({ type, checked, title, icon })}
          </li>
        `
      })
      .join('')

  this.typesWrapper.innerHTML = `
      <ul class="type-buttons-list">
        ${stringifyList(typesNames)}
      </ul>
  `
}
