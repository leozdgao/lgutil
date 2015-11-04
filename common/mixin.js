function mixin (reciever, supplier, entire) {
  var iterator = entire ? Object.getOwnPropertyNames : Object.keys
  // check es5
  if (Object.getOwnPropertyDescriptor) {
    iterator.call(null, supplier).forEach(function (key) {
      var descriptor = Object.getOwnPropertyDescriptor(supplier, key)
      Object.defineProperty(reciever, key, descriptor)
    })
  }
  // compatibility for es3, use shadow copy
  else {
    for (var key in supplier) if (supplier.hasOwnProperty(key)) {
      reciever[key] = supplier[key]
    }
  }
}


module.exports = mixin
