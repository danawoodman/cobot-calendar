export default function lastDateOfMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month + 1, 0)
}
