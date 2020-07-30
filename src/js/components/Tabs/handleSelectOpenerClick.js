import classNames from './classNames'

export default function handleSelectOpenerClick(opener) {
  const select = opener.closest(`.${classNames.select}`)
  select.classList.toggle('tabs-select--open')
}
