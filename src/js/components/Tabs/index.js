import Tabs from './Tabs'

export default () => {
  const containers = [...document.querySelectorAll('.js-tabs')]
  if (!containers.length) return

  containers.forEach(container => {
    const tabs = new Tabs(container)
    tabs.init()
  })
}
