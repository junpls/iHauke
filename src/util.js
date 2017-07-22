export function toMoney (cents) {
  return (cents / 100) + '€'
}

export function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
