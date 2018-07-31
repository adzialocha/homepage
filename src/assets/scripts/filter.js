export default class Filter {
  constructor(options) {
    this.elems = options.elems
    this.currentFilters = []

    for (let elem of this.elems) {
      const { filter, filterCategory } = elem.dataset

      if (!this.isFilterActive(filter)) {
        this.toggleFilter(filter)
      }

      if (typeof filterCategory !== 'undefined') {
        elem.addEventListener('click', () => {
          this.toggleFilter(filter)
        })
      }
    }
  }

  isFilterActive(filter) {
    return this.currentFilters.includes(filter)
  }

  toggleFilter(filter) {
    const newStatus = !this.isFilterActive(filter)

    if (newStatus) {
      this.currentFilters.push(filter)
    } else {
      this.currentFilters.splice(this.currentFilters.indexOf(filter), 1)
    }

    for (let elem of this.elems) {
      if (elem.dataset.filter !== filter) {
        continue
      }

      if (newStatus) {
        elem.classList.remove('filter-inactive')
      } else {
        elem.classList.add('filter-inactive')
      }
    }
  }
}
