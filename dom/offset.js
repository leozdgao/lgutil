/**
 * Get elements offset
 *
 * @param {HTMLElement} DOMNode
 * @returns {{top: number, left: number}}
 */

module.exports = function offset (DOMNode) {
  if (window.jQuery) {
    return window.jQuery(DOMNode).offset()
  }

  var docElem = document.documentElement
  var box = { top: 0, left: 0 }

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if (typeof DOMNode.getBoundingClientRect !== 'undefined') {
    box = DOMNode.getBoundingClientRect()
  }

  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  }
}
