import classNames from '../../../classNames'

export default ({ title, icon, type, checked }) => {
  return `
    <label class="type-button box">
      <input
        class="${classNames.tabs.typeBtn}"
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
