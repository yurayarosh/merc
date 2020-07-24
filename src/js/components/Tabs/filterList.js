export default function filterList(props = {}) {
  const { group = 'all', type } = props

  const setFirstOfType = (item, i) => (i === 0 ? { ...item, isFirstOfType: true } : item)

  const getTypesNames = list =>
    list.length > 0 ? [...new Set([...list].map(({ type: t }) => t))] : []

  const getSortedList = originList => {
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

    const recommendedItems = [...originList]
      .filter(({ isRecommended }) => isRecommended)
      .map(setFirstOfType)

    return [...getSortedRecommendedItems(recommendedItems), ...getSortedOriginList(originList)]
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
