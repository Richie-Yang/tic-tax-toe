// Declare some general variables
const table = document.querySelector('table#tictactoe')
const clearButton = document.querySelector('p#clear-button')
const winningStroke = document.querySelector('div#winning-stroke')
const currentTurn = document.querySelector('h2#current-turn')
const modeButton = document.querySelector('div#mode-button')
const loadingSpinner = document.querySelector('div.spinner-border')
let mode = 'playWithFriend'
let round = 1
let winner = 0
let timer = ''
let randomIndex

// Initialize the map for winning record
const winningList = {
  top: [
    { locationTop: '280px', locationLeft: '-150px', locationDeg: 'rotate(90deg)' },
    { locationTop: '280px', locationLeft: '0px', locationDeg: 'rotate(90deg)' },
    { locationTop: '280px', locationLeft: '150px', locationDeg: 'rotate(90deg)' }
  ],
  topLeft: { locationTop: '275px', locationLeft: '-55px', locationDeg: 'rotate(45deg)' },
  topRight: { locationTop: '285px', locationLeft: '-55px', locationDeg: 'rotate(135deg)' },
  left: [
    { locationTop: '130px', locationLeft: '0px', locationDeg: 'rotate(180deg)' },
    { locationTop: '280px', locationLeft: '0px', locationDeg: 'rotate(180deg)' },
    { locationTop: '430px', locationLeft: '0px', locationDeg: 'rotate(180deg)' }
  ]
}

// Function group
const gameRestarted = gameMode => {
  round = 1
  winner = 0
  winningStroke.style.display = 'none'
  currentTurn.innerHTML = gameMode === 'playWithFriend' ?
    'Current Turn: &#9711' : 'Bot Mode --- Your Turn: &#9711'
  document.querySelectorAll('table#tictactoe tr td').forEach(el => el.innerHTML = '')
  clearInterval(timer)
}

const countDownTimer = (callback, gameMode) => {
  let countDown = 4
  timer = setInterval(
    function () {
      countDown === 0 ? callback(gameMode) : currentTurn.innerHTML = `Game Restart Countdown: ${countDown -= 1}`
    }, 1000)
}

const winnerIdentify = gameMode => {
  // Using querySelectorAll to get all nodes
  const tdList = document.querySelectorAll('table#tictactoe td')

  // box-0 column match
  if (tdList[0].innerHTML !== '' && tdList[0].innerHTML === tdList[3].innerHTML && tdList[3].innerHTML === tdList[6].innerHTML) {
    winningStroke.style.top = winningList['top'][0]['locationTop']
    winningStroke.style.left = winningList['top'][0]['locationLeft']
    winningStroke.style.transform = winningList['top'][0]['locationDeg']
    winningStroke.style.width = '450px'
    winner = 998
    // box-1 column match
  } else if (tdList[1].innerHTML !== '' && tdList[1].innerHTML === tdList[4].innerHTML && tdList[4].innerHTML === tdList[7].innerHTML) {
    winningStroke.style.top = winningList['top'][1]['locationTop']
    winningStroke.style.left = winningList['top'][1]['locationLeft']
    winningStroke.style.transform = winningList['top'][1]['locationDeg']
    winningStroke.style.width = '450px'
    winner = 998
    // box-2 column match
  } else if (tdList[2].innerHTML !== '' && tdList[2].innerHTML === tdList[5].innerHTML && tdList[5].innerHTML === tdList[8].innerHTML) {
    winningStroke.style.top = winningList['top'][2]['locationTop']
    winningStroke.style.left = winningList['top'][2]['locationLeft']
    winningStroke.style.transform = winningList['top'][2]['locationDeg']
    winningStroke.style.width = '450px'
    winner = 998
    // box-0 row match
  } else if (tdList[0].innerHTML !== '' && tdList[0].innerHTML === tdList[1].innerHTML && tdList[1].innerHTML === tdList[2].innerHTML) {
    winningStroke.style.top = winningList['left'][0]['locationTop']
    winningStroke.style.left = winningList['left'][0]['locationLeft']
    winningStroke.style.transform = winningList['left'][0]['locationDeg']
    winningStroke.style.width = '450px'
    winner = 998
    // box-1 row match
  } else if (tdList[3].innerHTML !== '' && tdList[3].innerHTML === tdList[4].innerHTML && tdList[4].innerHTML === tdList[5].innerHTML) {
    winningStroke.style.top = winningList['left'][1]['locationTop']
    winningStroke.style.left = winningList['left'][1]['locationLeft']
    winningStroke.style.transform = winningList['left'][1]['locationDeg']
    winner = 998
    // box-2 row match
  } else if (tdList[6].innerHTML !== '' && tdList[6].innerHTML === tdList[7].innerHTML && tdList[7].innerHTML === tdList[8].innerHTML) {
    winningStroke.style.top = winningList['left'][2]['locationTop']
    winningStroke.style.left = winningList['left'][2]['locationLeft']
    winningStroke.style.transform = winningList['left'][2]['locationDeg']
    winningStroke.style.width = '450px'
    winner = 998
    // box slash match
  } else if (tdList[0].innerHTML !== '' && tdList[0].innerHTML === tdList[4].innerHTML && tdList[4].innerHTML === tdList[8].innerHTML) {
    winningStroke.style.top = winningList['topLeft']['locationTop']
    winningStroke.style.left = winningList['topLeft']['locationLeft']
    winningStroke.style.transform = winningList['topLeft']['locationDeg']
    winner = 999
    // box backslash match
  } else if (tdList[2].innerHTML !== '' && tdList[2].innerHTML === tdList[4].innerHTML && tdList[4].innerHTML === tdList[6].innerHTML) {
    winningStroke.style.top = winningList['topRight']['locationTop']
    winningStroke.style.left = winningList['topRight']['locationLeft']
    winningStroke.style.transform = winningList['topRight']['locationDeg']
    winner = 999
  }

  if (winner === 998) {
    currentTurn.innerHTML = round === 2 || round % 2 === 0 ? '&#10006 is the winner!' : '&#9711 is the winner!'
    winningStroke.style.width = '450px'
    winningStroke.style.display = 'block'
    countDownTimer(gameRestarted, gameMode)
    return 'halt'
  } else if (winner === 999) {
    currentTurn.innerHTML = round === 2 || round % 2 === 0 ? '&#10006 is the winner!' : '&#9711 is the winner!'
    winningStroke.style.width = '550px'
    winningStroke.style.display = 'block'
    countDownTimer(gameRestarted, gameMode)
    return 'halt'
  } else if (round === 9) {
    currentTurn.innerHTML = 'Fair!'
    countDownTimer(gameRestarted, gameMode)
    return 'halt'
  } else {
    round += 1
  }
}

const playWithFriend = function (event) {
  // if there is already a sign on it, then alert
  if (event.target.innerHTML !== '') {
    alert('Please choose the empty slot!')
  } else if (winner > 900) {
    alert('Please waiting for the game to restart!')
  } else {
    // render either cross sign or circle sign for each turn
    event.target.innerHTML = round === 2 || round % 2 === 0 ? '&#10006' : '&#9711'
    currentTurn.innerHTML = round === 2 || round % 2 === 0 ? 'Current Turn: &#9711' : 'Current Turn: &#10006'
    winnerIdentify('playWithFriend')
  }
}

const playWithBot = function (event) {
  // Player Turn
  // if there is already a sign on it, then alert
  if (event.target.innerHTML !== '') {
    alert('Please choose the empty slot!')
  } else if (winner > 900) {
    alert('Please waiting for the game to restart!')
  } else if (round <= 9 && (round % 2 !== 0)) {
    // render either cross sign or circle sign for each turn
    event.target.innerHTML = '&#9711'
    let progress = winnerIdentify('playWithBot')
    if (progress !== 'halt') {
      // Bot Turn
      // Using querySelectorAll to get all nodes
      const tdList = document.querySelectorAll('table#tictactoe td')
      currentTurn.innerHTML = 'Bot Mode --- Bot Turn: &#10006'
      loadingSpinner.style.display = 'block'

      setTimeout(function () {
        do {
          randomIndex = Math.floor(Math.random() * 9)
          // console.log(randomIndex)
        } while (tdList[randomIndex].innerHTML !== '')
        loadingSpinner.style.display = 'none'
        tdList[randomIndex].innerHTML = '&#10006'
        winnerIdentify('playWithBot')
        currentTurn.innerHTML = 'Bot Mode --- Your Turn: &#9711'
      }, 2000)
    }
  }
}

// EventListener for cross click or circle click
table.addEventListener('click', playWithFriend)

// Eventlistener to restart the game
clearButton.addEventListener('click', function (event) {
  gameRestarted(mode)
})

// EventListener to switch modes
modeButton.addEventListener('click', function (event) {
  if (mode !== 'playWithFriend') {
    table.removeEventListener('click', playWithBot)
    table.addEventListener('click', playWithFriend)
    mode = 'playWithFriend'
    gameRestarted(mode)
    event.target.innerHTML = 'Bot Mode'
  } else {
    table.removeEventListener('click', playWithFriend)
    table.addEventListener('click', playWithBot)
    mode = 'playWithBot'
    gameRestarted(mode)
    event.target.innerHTML = 'Friend Mode'
  }
})

