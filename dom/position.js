var offsetFunc = require('./offset')

/**
 * Get elements position
 *
 * @param {HTMLElement} elem
 * @param {HTMLElement?} offsetParent
 * @returns {{top: number, left: number}}
 */
var position = function (elem, offsetParent) {
  var offset, parentOffset

  if (window.jQuery) {
    if (!offsetParent) {
      return window.jQuery(elem).position()
    }

    offset = window.jQuery(elem).offset()
    parentOffset = window.jQuery(offsetParent).offset()

    // Get element offset relative to offsetParent
    return {
      top: offset.top - parentOffset.top,
      left: offset.left - parentOffset.left
    }
  }

  parentOffset = { top: 0, left: 0 }

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
  if (window.getComputedStyle(elem).position === 'fixed' ) {
    // We assume that getBoundingClientRect is available when computed position is fixed
    offset = elem.getBoundingClientRect()
  }
  else {
    if (!offsetParent) {
      // Get *real* offsetParent
      offsetParent = position.offsetParent(elem)
    }

    // Get correct offsets
    offset = offsetFunc(elem)
    if (offsetParent.nodeName !== 'HTML') {
      parentOffset = offsetFunc(offsetParent)
    }

    // Add offsetParent borders
    parentOffset.top += parseInt(window.getComputedStyle(offsetParent).borderTopWidth, 10)
    parentOffset.left += parseInt(window.getComputedStyle(offsetParent).borderLeftWidth, 10)
  }

  // Subtract parent offsets and element margins
  return {
    top: offset.top - parentOffset.top - parseInt(window.getComputedStyle(elem).marginTop, 10),
    left: offset.left - parentOffset.left - parseInt(window.getComputedStyle(elem).marginLeft, 10)
  }
}

/**
 * Get parent element
 *
 * @param {HTMLElement?} elem
 * @returns {HTMLElement}
 */
position.offsetParent = function (elem) {
  var docElem = document.documentElement
  var offsetParent = elem.offsetParent || docElem

  while (offsetParent && (offsetParent.nodeName !== 'HTML' &&
    window.getComputedStyle(offsetParent).position === 'static')) {
    offsetParent = offsetParent.offsetParent
  }

  return offsetParent || docElem
}

module.exports = position
