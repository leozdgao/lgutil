// tasks should be a collection of thunk
const parallel = (...tasks) => (cb) => {
  let hasError = false
  let successed = 0
  const ret = []
  tasks = tasks.filter(val => typeof val === 'function')
  tasks.forEach((task, i) => {
    const thunk = task
    thunk((err, ...args) => {
      if (err) hasError = true
      else {
        // collect result
        if (args.length <= 1) args = args[0]
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

export default parallel
