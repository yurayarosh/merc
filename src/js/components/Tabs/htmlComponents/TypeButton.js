export default ({ title, icon, type, checked }) => {
  return `
    <label class="type-button">
      <input
        class="js-tabs-type-button"
        type="checkbox"
        value="${type}"
        ${checked ? 'checked' : ''}
      />
      <span class="type-button__label">
        <span class="type-button__icon-wrap">
          <span class="icon icon--${icon}"></span>
        </span>
        <span class="name">${title}</span>
      </span>
    </label>
  `
}
