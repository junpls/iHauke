export function toMoney (cents) {
  let div = (cents / 100) + ''
  let split = div.split('.')
  if (split[1] && split[1].length < 2) {
    split[1] += '0'
  }
  return split.join(',') + '€'
}

export function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function hexFrom (num) {
  return num.toString(16)
}

export function hexTo (str) {
  return parseInt(str, 16)
}

export async function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
