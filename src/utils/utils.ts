import moment from 'moment'

export const formatDate = (date: any, format: string = 'DD/MM/YYYY HH:mm'): string => {
  if (date === 'undefined' || !date) {
    return ''
  }
  return moment(date).format(format)
}
