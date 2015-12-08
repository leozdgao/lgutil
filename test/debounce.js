import { debounce } from '../src/fp'
import {  } from 'lodash'
import assert from 'assert'

describe('Debounce test', _ => {
  it('callback only be invoked after delay', done => {
    let count = 0
    const inc = debounce(_ =>  count++, 100)

    inc()
    inc()

    setTimeout(_ => {
      inc()
      inc()
    }, 150)

    setTimeout(_ => {
      assert.equal(count, 1)
      done()
    }, 200)
  })
  it('leading invoke for debounce', done => {
    let count = 0
    const inc = debounce(_ =>  count++, 100, { tailing: false })

    inc()
    inc()

    setTimeout(_ => {
      inc()
      inc()
    }, 150)

    setTimeout(_ => {
      assert.equal(count, 2)
      done()
    }, 200)
  })
})
