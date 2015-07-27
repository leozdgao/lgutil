var ie = !document.addEventListener;
var addEventMethod = ie ? 'attachEvent': 'addEventListener';
var removeEventMethod = ie ? 'detachEvent': 'removeEventListener';

var currentFocusListener;

module.exports = {
  listen: function (target, eventType, callback) {
    /**
     * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
     * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
     *
     * We only allow one Listener at a time to avoid stack overflows
     */
    if(eventType == 'focus') {
      var remove;
      if(currentFocusListener) currentFocusListener.remove();

      if (ie) {
        document.attachEvent('onfocusin', callback);
        remove = function() { document.detachEvent('onfocusin', callback); };
      }
      else { // chrome/ff, use event capture to simulate this event
        document.addEventListener('focus', callback, true);
        remove = function() { document.removeEventListener('focus', callback, true); };
      }

      currentFocusListener = { remove: remove };

      return currentFocusListener;
    }

    // common way
    eventType = ie ? 'on' + eventType : eventType;
    target[addEventMethod](eventType, callback, false);

    return {
      remove: function() {
        target[removeEventMethod](eventType, callback, false);
      }
    };
  }
}
