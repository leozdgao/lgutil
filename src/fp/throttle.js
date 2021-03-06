export default function throttle (fn, delay = 250, options = {}) {
  const { tailing = true } = options
  let last, timer
  return function () {
    const exe = _ => {
      fn.apply(this, arguments)
      last = +new Date()
    }

    // check expired
    const now = +new Date()
    if (last && last + delay > now) {
      if (tailing) {
        clearTimeout(timer)
        timer = setTimeout(_ => {
          exe()
        }, delay)
      }
    }
    else exe()
  }
}
