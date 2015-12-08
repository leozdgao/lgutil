import { throttle } from '../src/fp'
import assert from 'assert'
import lodash from 'lodash'

describe.only('Throttle test', _ => {
  it('callback is invoked in a fixed frequency', done => {
    let count = 0
    const inc = throttle(_ => count++, 100)

    inc()
    inc()

    setTimeout(_ => {
      inc()
      inc()
    }, 110)

    setTimeout(_ => {
      inc()
      inc()

      assert.equal(count, 3)
      done()
    }, 220)
  })
})
