'use strict'

const IMAGE_SELECTOR = '.image'
const IMAGE_LOADING_CLASS = 'image--loading'

function preload(src, ready) {
  const img = new Image()
  img.onload = () => {
    ready(img)
  }
  img.src = src
}

export default function loadImages() {
  const imageElems = document.querySelectorAll(IMAGE_SELECTOR)

  for (let i = 0; i < imageElems.length; i++) {
    const elem = imageElems[i]
    const {src, createImg} = elem.dataset

    elem.classList.add(IMAGE_LOADING_CLASS)

    preload(src, (imgElem) => {
      if (createImg) {
        elem.appendChild(imgElem)
      } else {
        elem.style.backgroundImage = `url(${src})`
      }

      elem.classList.remove(IMAGE_LOADING_CLASS)
    })
  }
}
