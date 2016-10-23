'use strict'

import initializeSlider from './slider'
import initializeGallery from './gallery'
import loadImages from './image'

document.addEventListener('DOMContentLoaded', () => {
  initializeSlider()
  initializeGallery()
  loadImages()
})
