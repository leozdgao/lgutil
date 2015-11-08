export default function mixin (behaviour, sharedBehaviour = {}) {
  const instanceKeys = Object.keys(behaviour)
  const sharedKeys = Object.keys(sharedBehaviour)
  const typeTag = Symbol('isa')

  // return a class decorator
  function _mixin (klass) {
    for (const property of instanceKeys) {
      Object.defineProperty(klass.prototype, property, { value: behaviour[property] })
    }
    Object.defineProperty(klass.prototype, typeTag, { value: true })

    return klass
  }

  for (const property of instanceKeys) {
    Object.defineProperty(_mixin, property, {
      value: sharedBehaviour[property],
      enumerable: sharedBehaviour.propertyIsEnumerable(property)
    })
  }

  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (instance) => {
      return !!instance[typeTag]
    }
  })

  return _mixin
}
