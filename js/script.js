
var startDOM = document.querySelector('#start')
var gameOver = document.getElementById("game-over")
gameOver.style.display = 'none'
var flipDOM = document.getElementById("flips")
var win = document.getElementById("win")
win.style.display = 'none'
var restart = document.getElementById("restart")

startDOM.addEventListener('click', function () {

  startDOM.style.display = 'none'
  //Kalan süreyi hesaplattırma
  var sayac = 120
  function say() {
    document.getElementById("time-remaining").innerHTML = sayac
    sayac--
  }
  //SetInterval kullanarak 1000ms aralıklarla sayacı düşür
  a = setInterval(say, 1000)
  setTimeout(() => {
    clearInterval(a)
    gameOver.style.display = 'flex'
  }, 120000)

})

var cardBackDOM = document.querySelectorAll('.card-back')
var cardFrontDOM = document.querySelectorAll('.card-front-visible')
let flipCardOne, flipCardTwo
let cardOne, cardTwo
let nextSiblingOne, nextSiblingTwo
var click = 0
var match = 1

cardBackDOM.forEach(function (item) {
  item.addEventListener('click', function (e) {
    click++
    flipDOM.innerHTML = click


    let flipCard = (e.currentTarget)
    let clickedCard = (e.currentTarget.id)

    if (!flipCardOne) {
      cardOne = clickedCard
      flipCardOne = flipCard
      nextSiblingOne = item.nextElementSibling

    }
    else if (flipCardOne) {
      cardTwo = clickedCard
      flipCardTwo = flipCard
      nextSiblingTwo = item.nextElementSibling
      nextSiblingTwo.classList.add('clicked')

    }

    nextSiblingOne.classList.add('clicked')

    //Kartlara her tıklandığında ses efekti ver
    var flipAudio = document.getElementById("flipAudio")
    flipAudio.play()
    flipAudio.volume = 0.4

    cardFrontDOM.forEach(function (element) {


      if (nextSiblingOne && nextSiblingOne.classList.contains('clicked')) {

        nextSiblingOne.style.display = 'flex'


      }
      if (nextSiblingTwo && nextSiblingTwo.classList.contains('clicked')) {

        nextSiblingTwo.style.display = 'flex'

      }


      if (flipCardTwo && nextSiblingTwo && nextSiblingOne && flipCardOne) {
        if (cardOne !== cardTwo) {

          setTimeout(() => {

              nextSiblingOne.style.display = 'none',
              nextSiblingTwo.style.display = 'none',
              flipCardOne = flipCardTwo = cardOne = cardTwo = nextSiblingOne = nextSiblingTwo = ""
          }, 800)

        }
        else if (cardOne == cardTwo) {

          //Kartlar eşleştiğinde ses efekti ver
          setTimeout(() => {
            var matchAudio = document.getElementById("matchAudio")
            matchAudio.play()
            matchAudio.volume = 0.4
          }, 400)

          match +
          console.log(match)

          nextSiblingOne.classList.add('matched')
          nextSiblingTwo.classList.add('matched')
          nextSiblingOne.style.display = 'flex'
          nextSiblingTwo.style.display = 'flex'
          match++
          flipCardOne = flipCardTwo = cardOne = cardTwo = nextSiblingOne = nextSiblingTwo = ""

        }
        //Tüm kartlar eşleştiğinde you win yazısı ortaya çıkart
        if (match == 9) {
          win.style.display = 'flex'
          clearInterval(a)
        }

      }


    })

  })
  //Click to restart'a tıklanığında sayfayı yeniden yükler
  restart.addEventListener('click', function () {
    location.reload()
  }
  )

})





