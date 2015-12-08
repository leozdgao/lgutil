// 从对象中获取符合条件的值
//
// ```
// var obj = {
//   a: 1, b: 2, c: 3
// }
// pick(obj, val => val < 2) // { a: 1 }
// ```
//
export default function pick (obj, predicate) {
  return Object.keys(obj).reduce((result, key) => {
    const val = obj[key]
    if (predicate(val)) {
      result[key] = val
    }
    return result
  }, {})
}
