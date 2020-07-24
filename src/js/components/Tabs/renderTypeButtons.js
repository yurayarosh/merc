import TypeButton from './htmlComponents/TypeButton'
import { LANGUAGE } from './translations'
import { TRANSITION_DURATION } from './constants'
import {
  iconHatchback,
  iconCoupe,
  iconCabriolet,
  iconSuv,
  iconRoadster,
  iconMinivan,
  iconTModel,
  iconSedan,
} from './icons'

export default function renderTypeButtons() {
  const {
    list: listData,
    translations: { types },
  } = this.store

  const typesNames =
    listData.length > 0 ? [...new Set(listData.map(({ type }) => type)), 'all'] : ['all']

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
            icon = iconSedan
            break
          case 't-model':
            icon = iconHatchback
            break
          case 'coupe':
            icon = iconCoupe
            break
          case 'cabriolet':
            icon = iconCabriolet
            break
          case 'suv':
            icon = iconSuv
            break
          case 'roadster':
            icon = iconRoadster
            break
          case 'hatchback':
            icon = iconHatchback
            break
          case 'minivan':
            icon = iconMinivan
            break
          case 'all':
            break
          default:
            icon = iconSedan
            break
        }

        const checked = this.currentTypeName ? this.currentTypeName === type : true

        return `
          <li>
            ${TypeButton({ type, checked, title, icon })}
          </li>
        `
      })
      .join('')

  const appendInner = (props = {}) => {
    const { animate = false } = props

    this.typesWrapper.innerHTML = `
      <ul class="type-buttons-list">
        ${stringifyList(typesNames)}
      </ul>
    `
    if (animate) this.typesWrapper.style.opacity = 1
  }

  if (TRANSITION_DURATION > 0) {
    this.typesWrapper.style.opacity = 0
    setTimeout(appendInner.bind({ animate: true }), TRANSITION_DURATION)
  } else {
    appendInner()
  }
}
