import isInViewport from './isInViewport'
import offset from './offset'

export default function parallax (speedFactor) {
  return function (elem) {
    // here will trigger layout if DOM is invalidate
    const styles = window.getComputedStyle(elem)
    const bkgPosition = styles['background-position']
    let [ bpX, bpY ] = bkgPosition.split(' ')

    if (bpY.slice(-1) === '%') {
      console.warn('Dont support value of background-position-y is a percentage. Take it as 0px')
      bpY = '0px'
    }

    window.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    update()

    function update () {
      const top = offset(elem).top
      const pos = window.pageYOffset
      const rect = elem.getBoundingClientRect()

      // users can't see this element
      if (isInViewport(elem)) return

      elem.style['backgroundPosition'] = bpX + " " + (parseInt(bpY) + Math.round((top - pos) * speedFactor)) + "px"
    }
  }
}
