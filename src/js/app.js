import regeneratorRuntime from 'regenerator-runtime'
// import './public-path'
import classNames from './classNames'
// import { isModernBrowser } from './helpers'

// import loadPolyfills from './polyfills/loadPolyfills'
// import setHTMLClassNames from './methods/setHTMLClassNames'

// import setLazy from './components/LazyLoader/setLazy'
// import Menu from './components/Menu/Menu'
import setTabs from './components/Tabs'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    // this.dom = {
    //   body: document.body,
    // }
    // this.state = {
    //   hasMenuOpen: false,
    // }

    // this.menu = new Menu(this)
  }

  // updateState(state) {
  //   this.state = {
  //     ...this.state,
  //     ...state,
  //   }
  // }

  initMethods() {
    this.methods = {
      // setHTMLClassNames,
      // setLazy,
      setTabs,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  init() {
    this.initMethods()

    // this.menu.init()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  // window.app = app
})

// const init = () => {
// const app = new App()
// app.init()
// window.app = app
// }

// if (isModernBrowser) {
//   document.addEventListener('DOMContentLoaded', init)
// } else {
//   document.addEventListener('DOMContentLoaded', loadPolyfills.bind(null, init))
// }
