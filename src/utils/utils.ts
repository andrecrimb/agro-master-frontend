import dayjs from 'dayjs'

export const formatDate = (date: any, format: string = 'DD/MM/YYYY HH:mm'): string => {
  if (date === 'undefined' || !date) {
    return ''
  }
  return dayjs(date).format(format)
}
