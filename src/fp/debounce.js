export default function debounce (fn, delay = 250, options = {}) {
  const { tailing = true } = options
  let timer, scheduled = true
  return function () {
    if (tailing && timer) clearTimeout(timer)

    if (!tailing && scheduled) {
      fn.apply(this, arguments)
      scheduled = false
    }

    timer = setTimeout(_ => {
      if (tailing) fn.call(this)
      scheduled = true
    }, delay)
  }
}
