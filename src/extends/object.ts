const inherit = (Child: any, Parent: any): void => {
  const prototype = Object.create(Parent.prototype)
  prototype.constructor = Child
  Child.prototype = prototype
  Object.setPrototypeOf(Child, Parent)
}

const cloneDeep = (obj: any): any => {
  const res = (Array.isArray(obj) ? [] : {}) as any
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && typeof obj[key] === 'object') {
      res[key] = cloneDeep(obj[key])
    } else {
      res[key] = obj[key]
    }
  })
  return res
}

const freezeDeep = (obj: any): any => {
  Object.getOwnPropertyNames(obj).forEach(name => {
    const prop = obj[name]
    if (typeof prop === 'object' && prop !== null) {
      freezeDeep(obj)
    }
  })
  return Object.freeze(obj)
}

const install = (): void => {
  Object.assign(Object, {
    inherit,
    cloneDeep,
    freezeDeep
  })
}

export { inherit, cloneDeep, freezeDeep, install }
