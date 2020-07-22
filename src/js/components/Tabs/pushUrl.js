import { QUERY_GROUP, QUERY_TYPE } from './constants'

export default function pushUrl() {
  const newUrl = this.currentTypeName
    ? `${this.baseUrl}?${QUERY_GROUP}${this.currentGroupName}&${QUERY_TYPE}${this.currentTypeName}`
    : `${this.baseUrl}?${QUERY_GROUP}${this.currentGroupName}`

  window.history.pushState({}, '', newUrl)
}
