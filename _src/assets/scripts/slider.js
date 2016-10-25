'use strict'

const SLIDER_SELECTOR = '.slider'
const SLIDER_RIGHT_SELECTOR = '.slider__right'
const SLIDER_LEFT_SELECTOR = '.slider__left'
const SLIDER_SWITCHED_CLASS = 'slider--switched'

const WRAPPER_SELECTOR = '.slider'

export default function initializeSlider() {
  const sliderElem = document.querySelector(SLIDER_SELECTOR)
  const wrapperElem = document.querySelector(WRAPPER_SELECTOR)

  document.querySelector(SLIDER_RIGHT_SELECTOR).addEventListener('mouseenter', () => {
    sliderElem.classList.add(SLIDER_SWITCHED_CLASS)

    /** This might look wierd but it's as wierd as a safari issue where our
      scrolling div is getting ignored after the user clicked on the gallery.. */
    wrapperElem.style.marginBottom = '1px'
    window.setTimeout(() => {
      wrapperElem.style.marginBottom = 0
    }, 500)
  })

  document.querySelector(SLIDER_LEFT_SELECTOR).addEventListener('mouseenter', () => {
    sliderElem.classList.remove(SLIDER_SWITCHED_CLASS)
  })
}
