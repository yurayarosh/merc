import regeneratorRuntime from 'regenerator-runtime'
import classNames from './classNames'
import { isModernBrowser } from './helpers'

import loadPolyfills from './polyfills/loadPolyfills'
import setTabs from './components/Tabs'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
  }

  initMethods() {
    this.methods = {
      setTabs,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  init() {
    this.initMethods()
  }
}

const init = () => {
  const app = new App()
  app.init()
  window.app = app

  // const models = [...document.querySelectorAll('#content-1 .catalog__box')]

  // const infoList = models.map(card => {
  //   let group = ''

  //   if (card.querySelector('.info--name')) {
  //     if (card.querySelector('.info--name').innerText.includes('AMG')) group = 'amg'
  //   }

  //   const title = card.querySelector('.title--two').innerHTML

  //   return {
  //     group,
  //     type: 'sedan',
  //     title,
  //     url: {
  //       main: card.querySelector('.image').getAttribute('href'),
  //       auxiliary:
  //         card.querySelectorAll('.valign').length >= 2
  //           ? card.querySelectorAll('.valign')[1].getAttribute('href')
  //           : '',
  //     },
  //     image: {
  //       front: 'limousine-1',
  //       side: 'glb-class',
  //       back: 'gle-coupe',
  //       alt: card.querySelector('img').getAttribute('alt'),
  //     },

  //     info: {
  //       ru: {
  //         note: 'Розничная цена',
  //         name: 'C-Class седаны',
  //         price: 'от 824 946 ₴',
  //       },
  //       uk: {
  //         note: card.querySelector('.info--note')
  //           ? card.querySelector('.info--note').innerText
  //           : '',
  //         name: card.querySelector('.info--name')
  //           ? card.querySelector('.info--name').innerText
  //           : '',
  //         price: card.querySelector('.info--price')
  //           ? card.querySelector('.info--price').innerText
  //           : '',
  //       },
  //     },
  //   }
  // })

  // console.log(infoList)
}

if (isModernBrowser) {
  document.addEventListener('DOMContentLoaded', init)
} else {
  document.addEventListener('DOMContentLoaded', loadPolyfills.bind(null, init))
}
