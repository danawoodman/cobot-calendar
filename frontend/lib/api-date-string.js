import moment from 'moment'

export default function apiDate(date) {
  return moment(date).format('Y-MM-DD') + ' 0:00 +0000'
}
