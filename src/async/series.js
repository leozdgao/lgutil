import keyIterator from './keyIterator'
import parallel from './parallel'

// tasks should be a collection of thunk
const series = (...tasks) => (each) => (cb) => {
  tasks = tasks.filter(val => val != null)
  const nextKey = keyIterator(tasks)
  const nextThunk = () => {
    const key = nextKey.next()
    let thunk = tasks[key]
    if (Array.isArray(thunk)) thunk = parallel.apply(null, thunk).call(null, each)
    return [ key, thunk ]
  }
  let key, thunk
  let next = nextThunk()
  key = next[0]
  thunk = next[1]
  if (thunk == null) return cb(null)

  const ret = []
  const iterator = () => {
    thunk((err, ...args) => {
      if (err) cb(err)
      else {
        // collect result
        if (args.length <= 1) args = args[0]
        if (isFunction(each)) each.call(null, args, key)

        next = nextThunk()
        key = next[0]
        thunk = next[1]
        if (thunk == null) return cb(null, ret) // finished
        else iterator()
      }
    })
  }
  iterator()
}

export default series
