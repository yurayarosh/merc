export default function filterList(props = {}) {
  const { group = 'all', type } = props

  const setFirstOfType = (item, i) => (i === 0 ? { ...item, isFirstOfType: true } : item)

  const getSortedList = originList => {
    const typesNames =
      originList.length > 0 ? [...new Set([...originList].map(({ type: t }) => t))] : []
    const sortedByType = []

    typesNames.forEach(typeName => {
      const sublist = [...originList]
        .filter(({ isRecommended, type: t }) => t === typeName && !isRecommended)
        .map(setFirstOfType)

      sortedByType.push(...sublist)
    })

    const recommendedItems = [...originList]
      .filter(({ isRecommended }) => isRecommended)
      .map(setFirstOfType)

    return [...recommendedItems, ...sortedByType]
  }

  if (group === 'all') {
    const filteredList = type
      ? [...this.originListData].filter(({ type: filteredType }) => filteredType === type)
      : [...this.originListData]

    this.listData = getSortedList(filteredList)
  } else {
    const filteredList = [...this.originListData].filter(
      ({ group: filteredGroup, type: filteredType }) => {
        if (type) return filteredGroup === group && filteredType === type
        return filteredGroup === group
      }
    )

    this.listData = getSortedList(filteredList)
  }
}
