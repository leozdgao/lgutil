function mixin (supplier) {
  return (reciever, entire) => {
    const iterator = entire ? Object.getOwnPropertyNames : Object.keys
    // check es5
    if (Object.getOwnPropertyDescriptor) {
      iterator.call(null, supplier).forEach((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(supplier, key)
        Object.defineProperty(reciever, key, descriptor)
      })
    }
    // compatibility for es3, use shadow copy
    else {
      for (const key in supplier) if (supplier.hasOwnProperty(key)) {
        reciever[key] = supplier[key]
      }
    }
  }
}


module.exports = mixin
