const rowsNumber = 3
const columnsNumber = 3
const SECOND = 1000

let currTile
let otherTile

let movesCounter = 0
let timeRemaining = 10

const initTable = () => {
  for (let r = 0; r < rowsNumber; r++) {
    for (let k = 0; k < columnsNumber; k++) {
        let tile = document.createElement("img")
        tile.src="./materijal/empty.jpg"

        tile.addEventListener("dragstart", dragStart)
        tile.addEventListener("dragover", dragOver)
        tile.addEventListener("dragenter", dragEnter)
        tile.addEventListener("dragleave", dragLeave)
        tile.addEventListener("drop", dragDrop)
        tile.addEventListener("dragend", dragEnd)

        document.getElementById("pieces").append(tile)
        document.getElementById("table").append(tile)
    }
  }
}

const initPieces = () => {
    const randomizedOrderOfPieces = getRandomizedOrderOfPieces()
    for (let i = 0; i<randomizedOrderOfPieces.length ;i++) {
        let tile = document.createElement("img")
        tile.src= "./materijal/" + randomizedOrderOfPieces[i] + ".jpg"

        tile.addEventListener("dragstart", dragStart)
        tile.addEventListener("dragover", dragOver)
        tile.addEventListener("dragenter", dragEnter)
        tile.addEventListener("dragleave", dragLeave)
        tile.addEventListener("drop", dragDrop)
        tile.addEventListener("dragend", dragEnd)
        document.getElementById("pieces").append(tile)
    }
}

const addListenerOnStartGameButton = () => {
    const startGameButton = document.getElementById("start-game-button")
    startGameButton.addEventListener("click", startGame)
}

const disableStartGameButton = () => {
    const startGameButton = document.getElementById("start-game-button")
    startGameButton.disabled = true
}

const getRandomizedOrderOfPieces = () => {
  let randomizedOrderOfPieces = []
  for (let i = 0; i < rowsNumber * columnsNumber; i++) {
      randomizedOrderOfPieces.push(i.toString())
  }

  randomizedOrderOfPieces.reverse()
  for(let i = 0; i < randomizedOrderOfPieces.length; i++){
      let j = Math.floor(Math.random() * randomizedOrderOfPieces.length)

      let tmp=randomizedOrderOfPieces[i]
      randomizedOrderOfPieces[i]=randomizedOrderOfPieces[j]
      randomizedOrderOfPieces[j]=tmp
  }

  return randomizedOrderOfPieces
}

const showConfirmDialog = () => {
    if (confirm("No time remaining. Try again?")) {
        location.reload()
    }
}

const initTimer = () => {
    setInterval(() => {
        timeRemaining -= 1
        document.getElementById("time-remaining").innerText = Math.max(0, timeRemaining)
        if (!timeRemaining) {
            showConfirmDialog()
        }
    }, SECOND)
}

const startGame = () => {
    disableStartGameButton()
    initPieces()
    initTimer()
}

window.onload = () => {
    initTable()
    addListenerOnStartGameButton()
}


function dragStart(){
    currTile = this
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this
}

function dragEnd(){
    if (currTile.src.includes("empty")){
        return
    }

    let currImg = currTile.src
    let otherImg = otherTile.src
    currTile.src = otherImg
    otherTile.src = currImg

    movesCounter += 1
    document.getElementById("moves-counter").innerText = movesCounter
}



