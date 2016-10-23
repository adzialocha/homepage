'use strict'

const SLIDER_SELECTOR = '.slider'
const SLIDER_RIGHT_SELECTOR = '.slider__right'
const SLIDER_LEFT_SELECTOR = '.slider__left'
const SLIDER_SWITCHED_CLASS = 'slider--switched'

export default function initializeSlider() {
  const sliderElem = document.querySelector(SLIDER_SELECTOR)

  document.querySelector(SLIDER_RIGHT_SELECTOR).addEventListener('mouseenter', () => {
    sliderElem.classList.add(SLIDER_SWITCHED_CLASS)
  })

  document.querySelector(SLIDER_LEFT_SELECTOR).addEventListener('mouseenter', () => {
    sliderElem.classList.remove(SLIDER_SWITCHED_CLASS)
  })
}
