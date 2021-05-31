import dayjs from 'dayjs'
import { Dictionary } from 'types/common'

export const formatDate = (date: any, format: string = 'DD/MM/YYYY HH:mm'): string => {
  if (date === 'undefined' || !date) {
    return ''
  }
  return dayjs(date).format(format)
}

/**
 * @param params params to be added
 * @param append whether should append the value or just replace the value in case that already exists
 * @param search the search ref
 * @param withPathName whether should return the path name or just the search params
 */
export const addURLSearch = (
  params: Dictionary<string>,
  append: boolean = false,
  search: string = window.location.search,
  withPathName: boolean = true
): string => {
  const urlParams = new URLSearchParams(search)
  for (const [param, value] of Object.entries(params)) {
    if (urlParams.has(param) && !append) {
      urlParams.set(param, value)
    } else {
      urlParams.append(param, value)
    }
  }
  return withPathName ? `${window.location.pathname}?${urlParams.toString()}` : urlParams.toString()
}
