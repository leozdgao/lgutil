// 检查元素是否位于视口中（用户是否可以看见它）
module.exports = function isInViewport (elem) {
  // display: none?
  const rect = elem.getBoundingClientRect()
  return rect.top >= document.documentElement.clientHeight || rect.bottom < 0
}
