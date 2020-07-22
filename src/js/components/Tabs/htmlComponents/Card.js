import { types, LANGUAGE } from '../translations'

export default ({ isFirstOfType, title, url, image, info, type }) => {
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
    <img src="${IMAGE_SRC_BASE}/${src}.png" alt="${image.alt || title.card}" />
  </picture>
  `

  return ` 
  <div class="catalog__box">
    <div class="title">
      <div class="title--two">${title}</div>
    </div>

    <a href="/${url.main}" class="static-image">
      ${getPicture(image.front)}
    </a>

    <div class="flexslider">
      <ul class="slides">
        <li>
          <a href="/${url.main}" class="image">
            ${getPicture(image.front)}
          </a>
        </li>
        <li>
          <a href="/${url.main}" class="image">
            ${getPicture(image.side)}
          </a>
        </li>
        <li>
          <a href="/${url.main}" class="image">
            ${getPicture(image.back)}
          </a>
        </li>
      </ul>
    </div>

    <div class="info">
      <p class="info--note">${info && info[LANGUAGE] ? info[LANGUAGE].note : ''}</p>
      <p class="info--name">${info && info[LANGUAGE] ? info[LANGUAGE].name : ''}</p>
      <p class="info--price">${info && info[LANGUAGE] ? info[LANGUAGE].price : ''}</p>
    </div>

    <div class="buttons">
      ${
        buttons[LANGUAGE] && buttons[LANGUAGE].length > 0
          ? buttons[LANGUAGE].map(({ title: buttonTitle, url: buttonUrl }, i) =>
              buttonUrl
                ? `<a class="valign" href="/${buttonUrl}">${buttonTitle}</a>`
                : '<a href="" hidden></a>'
            ).join('')
          : ''
      } 
    </div>
  </div>
  `
}
