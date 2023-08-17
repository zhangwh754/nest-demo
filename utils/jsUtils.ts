export const omit = (obj: object, arr: string[]) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})

export const sleep = (second = 1) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, second * 1000)
  })
}
