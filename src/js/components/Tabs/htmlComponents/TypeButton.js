import classNames from '../classNames'

export default ({ title, icon, type, checked }) => {
  return `
    <label class="type-button">
      <input
        class="${classNames.typeBtn}"
        type="radio"
        value="${type}"
        name="type-names"
        ${checked ? 'checked' : ''}
      />
      <span class="type-button__label">
          ${
            icon
              ? `
                <span class="type-button__icon-wrap">
                  ${icon}
                </span>
              `
              : ''
          }
        <span class="type-button__title">${title}</span>
      </span>
    </label>
  `
}
