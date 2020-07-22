export default function filterList({ group = 'all', type }) {
  const getSortedList = originList => {
    // const groupsNames =
    //   originList.length > 0 ? [...new Set(originList.map(({ group: g }) => g))] : []

    // if (!groupsNames.length) return []

    const sortedList = []

    // groupsNames.forEach(name => {
    // const list = [...originList].filter(({ group: g }) => g === name)
    // const typesNames = list.length > 0 ? [...new Set(list.map(({ type: t }) => t))] : []
    const typesNames = originList.length > 0 ? [...new Set(originList.map(({ type: t }) => t))] : []
    const sortedByType = []

    typesNames.forEach(typeName => {
      // const sublist = list.filter(({ type: t }) => t === typeName)
      const sublist = originList
        .filter(({ type: t }) => t === typeName)
        .map((item, i) => (i === 0 ? { ...item, isFirstOfType: true } : item))

      sortedByType.push(...sublist)
    })

    sortedList.push(...sortedByType)
    // })

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
