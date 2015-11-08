export default function compose (...funcs) {
  return (arg) => funcs.reduceRight((composed, func) => {
    return func(composed)
  }, arg)
}
