import { CURRENCY_INDEX, LANGUAGE } from './constants'

export default function filterList(props = {}) {
  const { group = 'all', type } = props

  const getTypesNames = list =>
    list.length > 0 ? [...new Set([...list].map(({ type: t }) => t))] : []

  const setFirstOfType = (item, i) => (i === 0 ? { ...item, isFirstOfType: true } : item)
  const resetFirstOfType = item => ({ ...item, isFirstOfType: false })

  const getFilteredByTypeList = (filteredList, filterCallback) => {
    const typesNames = getTypesNames(filteredList)
    const sortedByType = []

    typesNames.forEach(typeName => {
      const sublist = [...filteredList]
        .filter(filterCallback.bind(null, typeName))
        .map(setFirstOfType)

      sortedByType.push(...sublist)
    })

    return sortedByType
  }

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
      return getFilteredByTypeList(
        list,
        (typeName, { isRecommended, type: t }) => t === typeName && !isRecommended
      )
    }

    const getSortedRecommendedItems = list => {
      return getFilteredByTypeList(list, (typeName, { type: t }) => t === typeName)
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
  let filteredList = []

  if (group === 'new') {
    filteredList = originListData.filter(({ labels, type: filteredType }) => {
      if (type && type !== 'all') return labels && labels.new && filteredType === type
      return labels && labels.new
    })
  } else {
    filteredList = originListData.filter(({ group: filteredGroup, type: filteredType }) => {
      if (type && type !== 'all') return filteredGroup.indexOf(group) > -1 && filteredType === type
      return filteredGroup.indexOf(group) > -1
    })
  }

  let sortedList = getSortedList(filteredList)

  if (this.options.filter === 'available') {
    const filteredByAvailable = sortedList
      .filter(({ url: { auxiliary } }) => auxiliary)
      .map(resetFirstOfType)

    sortedList = getFilteredByTypeList(
      filteredByAvailable,
      (typeName, { type: t }) => t === typeName
    )
  }

  this.updateStore({
    list: sortedList,
  })
}
