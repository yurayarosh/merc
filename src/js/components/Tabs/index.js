import Tabs from './Tabs'

export default app => {
  const containers = [...document.querySelectorAll('.js-tabs')]
  if (!containers.length) return

  containers.forEach(container => {
    app.tabs = new Tabs(container)
    app.tabs.init()
  })
}
