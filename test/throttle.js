import { throttle } from '../src/fp'
import assert from 'assert'
import lodash from 'lodash'

describe.only('Throttle test', _ => {
  it('callback is invoked in a fixed frequency with tailing', done => {
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
    }, 220)

    setTimeout(_ => {
      assert.equal(count, 4)
      done()
    }, 330)
  })

  it('throttle without tailing', done => {
    let count = 0
    const inc = throttle(_ => count++, 100, { tailing: false })

    inc()
    inc()

    setTimeout(_ => {
      inc()
      inc()
    }, 110)

    setTimeout(_ => {
      inc()
      inc()
    }, 220)

    setTimeout(_ => {
      assert.equal(count, 3)
      done()
    }, 330)
  })
})
