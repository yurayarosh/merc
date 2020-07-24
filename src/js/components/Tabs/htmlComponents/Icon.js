export default ({ name, viewBox, inner }) => {
  const w = +viewBox.split(' ')[2]
  const h = +viewBox.split(' ')[3]

  const width = `${(w / h).toFixed(3)}em`

  return `
  <svg
    width="${width}"
    height="1em"
    viewBox="${viewBox}"
    class="icon-inline icon-inline--${name}">
    ${inner}
  </svg>
`
}
