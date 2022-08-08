const svg = document.getElementById('garden')
const toggle = document.getElementById('toggle')
const navigation = document.getElementById('navigation')
const navigationClose = document.getElementById('navigation-close')

let isNavigationActive = false
let counter = 0

const FLOWERS = ['✿']
const FLOWERS_COUNT = 100

function randomRange(min, max) {
  return Math.floor(min + (Math.random() * (max - min)))
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function addTextNode(text, x, y, size) {
  const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  textNode.setAttributeNS(null, 'x', x)
  textNode.setAttributeNS(null, 'y', y)
  textNode.appendChild(document.createTextNode(text))

  svg.appendChild(textNode)
}

function createGarden() {
  addTextNode(
    randomItem(FLOWERS),
    randomRange(0, window.screen.width),
    randomRange(150, window.screen.height)
  )

  counter += 1

  if (counter < FLOWERS_COUNT) {
    window.setTimeout(() => {
      createGarden()
    }, randomRange(1, 100))
  }
}

function toggleNavigation() {
  isNavigationActive = !isNavigationActive
}

function updateNavigation() {
  if (isNavigationActive) {
    navigation.classList.add('navigation--active')
    navigationClose.classList.add('navigation-close--active')
  } else {
    navigation.classList.remove('navigation--active')
    navigationClose.classList.remove('navigation-close--active')
  }
}

function resizeNavigation() {
  const size = Math.min(window.innerHeight, window.innerWidth)

  navigation.style.width = `${size}px`
  navigation.style.height = `${size}px`
}

toggle.addEventListener('click', () => {
  toggleNavigation()
  updateNavigation()
})

navigation.addEventListener('click', () => {
  toggleNavigation()
  updateNavigation()
})

navigationClose.addEventListener('click', () => {
  isNavigationActive = false
  updateNavigation()
})

window.addEventListener('resize', () => {
  resizeNavigation()
})

if (svg) {
  createGarden()
}

resizeNavigation()
