export default function filterList(props = {}) {
  const { group = 'all', type } = props

  const getSortedList = originList => {
    const sortedList = []

    const typesNames = originList.length > 0 ? [...new Set(originList.map(({ type: t }) => t))] : []
    const sortedByType = []

    typesNames.forEach(typeName => {
      const sublist = originList
        .filter(({ type: t }) => t === typeName)
        .map((item, i) => (i === 0 ? { ...item, isFirstOfType: true } : item))

      sortedByType.push(...sublist)
    })

    sortedList.push(...sortedByType)

    return sortedList
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
