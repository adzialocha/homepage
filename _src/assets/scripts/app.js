import Filter from './filter'

const filterElems = document.querySelectorAll('[data-filter]')

function init() {
  if (filterElems.length > 0) {
    new Filter({
      elems: filterElems,
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
