const valIterator = (cols) => {
  const keys = Object.keys(cols)
  let i = -1
  return {
    next () {
      i++ // inc
      if (i >= keys.length) return null
      else return keys[i]
    }
  }
}

export default valIterator
