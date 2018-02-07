const base = {}

base.Home = (resolve) => {
  import('@/view/base/Home').then((module) => {
    resolve(module)
  })
}
base.Index = (resolve) => {
  import('@/view/base/Index').then((module) => {
    resolve(module)
  })
}
base.Cart = (resolve) => {
  import('@/view/base/Cart').then((module) => {
    resolve(module)
  })
}
base.Center = (resolve) => {
  import('@/view/base/Center').then((module) => {
    resolve(module)
  })
}
base.Product = (resolve) => {
  import('@/view/base/Product').then((module) => {
    resolve(module)
  })
}
base.Pay = (resolve) => {
  import('@/view/base/Pay').then((module) => {
    resolve(module)
  })
}

export default base
