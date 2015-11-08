/**
 * Cross browser .contains() polyfill
 * @param  {HTMLElement} elem
 * @param  {HTMLElement} inner
 * @return {bool}
 */

module.exports = function contains (elem, inner) {
  function ie8Contains (root, node) {
    while (node) {
      if (node === root) {
        return true
      }
      node = node.parentNode
    }
    return false
  }

  return (elem && elem.contains)
      ? elem.contains(inner)
      : (elem && elem.compareDocumentPosition)
          ? elem === inner || !!(elem.compareDocumentPosition(inner) & 16)
          : ie8Contains(elem, inner)
}
