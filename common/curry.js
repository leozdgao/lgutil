function curry (func, target) {
  var argLength = func.length
  var args = []
  return function currify () {
    args = args.concat([].slice.call(arguments))
    if (argLength <= args.length) return func.apply(target, args)
    else return currify
  }
}

module.exports = curry
