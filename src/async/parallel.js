// tasks should be a collection of thunk
const parallel = (...tasks) => (each) => (cb) => {
  let hasError = false
  let successed = 0
  const ret = []
  tasks = tasks.filter(val => typeof val === 'function')

  if (tasks.length <= 0) cb(null)
  else {
    tasks.forEach((task, i) => {
      const thunk = task
      thunk((err, ...args) => {
        if (err) hasError = true
        else {
          // collect result
          if (args.length <= 1) args = args[0]
          if (isFunction(each)) each.call(null, args, i)
          ret[i] = args
          successed ++
        }

        if (hasError) cb(true)
        else if (tasks.length === successed) {
          cb(null, ret)
        }
      })
    })
  }
}

export default parallel
// tasks should be a collection of thunk
