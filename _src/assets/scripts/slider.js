'use strict'

const SLIDER_SELECTOR = '.slider'
const SLIDER_RIGHT_SELECTOR = '.slider__right'
const SLIDER_LEFT_SELECTOR = '.slider__left'
const SLIDER_SWITCHED_CLASS = 'slider--switched'

const WRAPPER_SELECTOR = '.slider'

const sliderElem = document.querySelector(SLIDER_SELECTOR)
const wrapperElem = document.querySelector(WRAPPER_SELECTOR)

function showContent() {
  sliderElem.classList.add(SLIDER_SWITCHED_CLASS)

  /** This might look wierd but it's as wierd as a safari issue where our
    scrolling div is getting ignored after the user clicked on the gallery.. */
  wrapperElem.style.marginBottom = '1px'
  window.setTimeout(() => {
    wrapperElem.style.marginBottom = 0
  }, 500)
}

function showGallery() {
  sliderElem.classList.remove(SLIDER_SWITCHED_CLASS)
}

function registerEvents(selector, cb) {
  document.querySelector(selector).addEventListener('mouseenter', cb)
  document.querySelector(selector).addEventListener('touchstart', cb)
}

export default function initializeSlider() {
  registerEvents(SLIDER_RIGHT_SELECTOR, showContent)
  registerEvents(SLIDER_LEFT_SELECTOR, showGallery)
}
