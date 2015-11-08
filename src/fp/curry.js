export default function curry (func, target) {
  const argLength = func.length
  let args = []
  return function currify (...others) {
    args = args.concat(others)
    if (argLength <= args.length) return func.apply(target, args)
    else return currify
  }
}
