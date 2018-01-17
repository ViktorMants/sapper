var generateMinefield = function(rows, columns, mines) {
  var KEY_SEPARATOR = ':'
  var NUMBER_OF_MINE = -1
  var NUMBER_OF_ZERO = 0
  var randomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
  var minefield = []
  var minePoints = {}
  var cellKeys = []
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      cellKeys.push([row, column].join(KEY_SEPARATOR))
    }
  }
  var cellsNearBombs = {}
  for (let mine = 0; mine < mines; mine++) {
    let randomIndex = randomInteger(0, cellKeys.length - 1)
    let randomCellKey = cellKeys.splice(randomIndex, 1)[0]
    console.log(randomCellKey)
    minePoints[randomCellKey] = NUMBER_OF_MINE
    let rowAndColumn = randomCellKey.split(KEY_SEPARATOR)
    let row = rowAndColumn[0] * 1
    let column = rowAndColumn[1] * 1
    for (let i = row - 1; i < row + 2; i++) {
      for (let j = column - 1; j < column + 2; j++) {
        let cellNearBombKey = [i, j].join(KEY_SEPARATOR)
        if (cellNearBombKey != randomCellKey) {
          cellsNearBombs[cellNearBombKey] = cellsNearBombs[cellNearBombKey] ?
            ++cellsNearBombs[cellNearBombKey] : 1
        }
      }
    }
  }
  for (let row = 0; row < rows; row++) {
    var minefieldItem = []
    for (let column = 0; column < columns; column++) {
      let minePoint = minePoints[[row, column].join(KEY_SEPARATOR)]
      let cellNearBomb = cellsNearBombs[[row, column].join(KEY_SEPARATOR)]
      minefieldItem.push(minePoint ? minePoint : (cellNearBomb ? cellNearBomb : NUMBER_OF_ZERO))
    }
    minefield.push(minefieldItem)
  }
  
  return minefield
}

export {generateMinefield}