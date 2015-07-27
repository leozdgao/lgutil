var ie = !window.addEventListener;
var addEventMethod = ie ? 'attachEvent': 'addEventListener';
var removeEventMethod = ie ? 'detachEvent': 'removeEventListener';

module.exports = {
  listen: function (target, eventType, callback) {
    eventType = ie ? 'on' + eventType : eventType;
    target[addEventMethod](eventType, callback, false);
    return {
      remove() {
        target[removeEventMethod](eventType, callback, false);
      }
    };
  }
}
