const X = 0,
  Y = 1

const setStyles = (element) => {
  element.style.position = "absolute"
}

const moveElement = (element, [x, y]) => {
  element.style.transform = `translate(${x}px, ${y}px)`
}

const getLimit = (element) => {
  const { width: containerWidth, height: containerHeight } = getComputedStyle(
    element.parentNode
  )
  const { width: elementWidth, height: elementHeight } =
    getComputedStyle(element)
  return [
    parseInt(containerWidth) - parseInt(elementWidth),
    parseInt(containerHeight) - parseInt(elementHeight),
  ]
}

const coordsGetter = () => {
  let coords = [0, 0]
  return ([dx, dy]) => {
    coords[X] += dx
    coords[Y] += dy
    return coords
  }
}

const isInRange = (num, range) => num > 0 && num < range

const moveLikeDVD = (element) => {
  const direction = [1, 1]
  const limit = getLimit(element)
  const getNewCoords = coordsGetter()
  setStyles(element)
  setInterval(() => {
    const coords = getNewCoords(direction)
    if (!isInRange(coords[X], limit[X])) direction[X] = 0 - direction[X]
    if (!isInRange(coords[Y], limit[Y])) direction[Y] = 0 - direction[Y]
    moveElement(element, coords)
  }, 10)
}

const element = document.getElementById("DVD")

moveLikeDVD(element)
