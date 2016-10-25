'use strict'

const GALLERY_SELECTOR = '.gallery'
const GALLERY_ITEMS_SELECTOR = '.gallery__item'
const GALLERY_ITEM_VISIBLE_CLASS = 'gallery__item--visible'

let galleryItemElems
let index

function nextImage() {
  index++
  if (index > galleryItemElems.length - 1) {
    index = 0
  }

  for (let i = 0; i < galleryItemElems.length; i++) {
    galleryItemElems[i].classList.remove(GALLERY_ITEM_VISIBLE_CLASS)
  }

  galleryItemElems[index].classList.add(GALLERY_ITEM_VISIBLE_CLASS)
}

export default function initializeGallery() {
  galleryItemElems = document.querySelectorAll(GALLERY_ITEMS_SELECTOR)
  index = -1

  document.querySelector(GALLERY_SELECTOR).addEventListener('click', ($event) => {
    $event.preventDefault()
    nextImage()
  })

  nextImage()
}
