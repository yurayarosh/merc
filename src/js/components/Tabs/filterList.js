import { CURRENCY_INDEX, LANGUAGE } from './constants'

export default function filterList(props = {}) {
  const { group = 'all', type } = props

  const setFirstOfType = (item, i) => (i === 0 ? { ...item, isFirstOfType: true } : item)

  const getTypesNames = list =>
    list.length > 0 ? [...new Set([...list].map(({ type: t }) => t))] : []

  const getSortedList = originList => {
    const getListWithCurrencyField = list => {
      return [
        ...list.map(item => {
          let price

          if (item.price) {
            let prefix = ''
            let format = ''
            const suffix = '₴'

            switch (LANGUAGE) {
              case 'ru':
                prefix = 'от'
                break
              case 'uk':
                prefix = 'від'
                break
              default:
                prefix = 'від'
                break
            }

            format = parseInt(item.price.replace(/\s/g, ''), 10)
            format *= CURRENCY_INDEX

            format = Math.round(format)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

            price = `${prefix} ${format} ${suffix}`
          } else {
            price = ''
          }

          return {
            ...item,
            price,
          }
        }),
      ]
    }

    const getSortedOriginList = list => {
      const typesNames = getTypesNames(list)
      const sortedByType = []

      typesNames.forEach(typeName => {
        const sublist = [...list]
          .filter(({ isRecommended, type: t }) => t === typeName && !isRecommended)
          .map(setFirstOfType)

        sortedByType.push(...sublist)
      })

      return sortedByType
    }

    const getSortedRecommendedItems = list => {
      const typesNames = getTypesNames(list)

      const sortedByType = []

      typesNames.forEach(typeName => {
        const sublist = [...list].filter(({ type: t }) => t === typeName)

        sortedByType.push(...sublist)
      })

      return sortedByType
    }

    const recommendedItems = getListWithCurrencyField(originList)
      .filter(({ isRecommended }) => isRecommended)
      .map(setFirstOfType)

    return [
      ...getSortedRecommendedItems(recommendedItems),
      ...getSortedOriginList(getListWithCurrencyField(originList)),
    ]
  }

  const { originList: originListData } = this.store

  if (group === 'all') {
    const filteredList =
      type && type !== 'all'
        ? originListData.filter(({ type: filteredType }) => filteredType === type)
        : originListData

    this.updateStore({
      list: getSortedList(filteredList),
    })
  } else {
    const filteredList = [...this.store.originList].filter(
      ({ group: filteredGroup, type: filteredType }) => {
        if (type && type !== 'all') return filteredGroup === group && filteredType === type
        return filteredGroup === group
      }
    )

    this.updateStore({
      list: getSortedList(filteredList),
    })
  }
}
