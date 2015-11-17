import valIterator from './valIterator'
import parallel from './parallel'

// tasks should be a collection of thunk
const series = (...tasks) => (cb) => {
  const nextVal = valIterator(tasks)
  const nextThunk = () => {
    let thunk = nextVal.next()
    if (Array.isArray(thunk)) thunk = parallel.apply(null, thunk)
    return thunk
  }
  let thunk = nextThunk()
  if (thunk == null) return cb(null)

  const ret = []
  const iterator = () => {
    thunk((err, ...args) => {
      if (err) cb(err)
      else {
        // collect result
        if (args.length <= 1) args = args[0]
        ret.push(args)

        thunk = nextThunk()
        if (thunk == null) return cb(null, ret) // finished
        else iterator()
      }
    })
  }
  iterator()
}

export default series
