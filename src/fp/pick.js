export default function pick (obj, predicate) {
  return Object.keys(obj).reduce((result, key) => {
    const val = obj[key]
    if (predicate(val)) {
      result[key] = val
    }
    return result
  }, {})
}
