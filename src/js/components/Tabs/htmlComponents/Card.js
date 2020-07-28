import { LANGUAGE } from '../constants'
import { iconMore, iconCart } from '../icons'

export default ({ title, url, image, price, labels }) => {
  const IMAGE_SRC_BASE = '//img.mercedes-benz-kiev.com/data/catalog'

  const buttons = {
    uk: [
      {
        url: url.main,
        title: 'Дізнайтесь більше',
      },
      {
        url: url.auxiliary,
        title: 'Придбати',
      },
    ],
    ru: [
      {
        url: url.main,
        title: 'Узнайте больше',
      },
      {
        url: url.auxiliary,
        title: 'Купить',
      },
    ],
  }

  const getPicture = src => `
  <picture>
    <source srcset="${IMAGE_SRC_BASE}/${src}.webp" type="image/webp" />
    <source srcset="${IMAGE_SRC_BASE}/${src}.png" type="image/png" />
    <img
      src="${IMAGE_SRC_BASE}/${src}.png"
      alt="${image.alt[LANGUAGE] || title[LANGUAGE] || title}"
      title="${image.title[LANGUAGE] || title[LANGUAGE] || title}"
    />
  </picture>
  `

  return ` 
  <div class="card">
    <div class="card__title">${title[LANGUAGE] || title}</div>
    <div class="card__subttl">${price}</div>

    <div class="card__inner">
      ${
        labels && Object.keys(labels).length > 0
          ? Object.values(labels)
              .map(
                (label, i) =>
                  `<div class="card__label${
                    Object.keys(labels)[i] !== 'new' ? ' card__label--aux' : ''
                  }">${label[LANGUAGE]}</div>`
              )
              .join(' ')
          : ''
      }

      <a href="/${url.main}" class="card__static-image">
        ${getPicture(image.front)}
      </a>

      <div class="card__slider flexslider">
        <ul class="slides">
          <li>
            <a href="/${url.main}" class="">
              ${getPicture(image.front)}
            </a>
          </li>
          <li>
            <a href="/${url.main}" class="">
              ${getPicture(image.side)}
            </a>
          </li>
          <li>
            <a href="/${url.main}" class="">
              ${getPicture(image.back)}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="card__buttons">
      ${
        buttons[LANGUAGE] && buttons[LANGUAGE].length > 0
          ? buttons[LANGUAGE].map(({ title: buttonTitle, url: buttonUrl }, i) =>
              buttonUrl
                ? `
                  <a 
                    class="card__button${i === 0 ? ' card__button--more' : ' card__button--buy'}" 
                    href="/${buttonUrl}"
                    >${i === 0 ? iconMore : iconCart}${buttonTitle}</a
                  >`
                : null
            ).join('')
          : ''
      } 
    </div>
  </div>
  `
}
