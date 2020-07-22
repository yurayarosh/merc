export default (props = {}) => {
  const { mod = 'js-show-more', title = 'Show all' } = props
  return `
    <div class="tabs__aux-button">
      <button type="button" class="button button--black ${mod}">${title}</button>
    </div>
  `
}
