var card = document.querySelector(".card");
var loseCard = document.querySelector(".lose-card");
var card2 = document.querySelector(".card2");
var canon = document.querySelector(".canon");
var blue_bar = document.querySelector(".blue-bar");
var scoreWin = document.querySelector('.new-game h1')
var ranWord;
var word;
var wordRect;
var targetX;
var targetY;


var score = 0;

const Words = ["enigmatic","intrigued","scientists","erudition","sagacity","impressed","serendipitous","discovery","revolutionized","ineffable","beauty","penurious","lifestyle","belied","cacophony","sounds","ubiquitous","presence","technology","shapes","verdant","hills","stretched","mellifluous","singer","enchanted","perspicacious","observations","revealed","truth","labyrinthine","streets","confusing","ephemeral","sunset","mesmerized","indomitable","spirit","adversity","tenacious","climber","summit","lugubrious","atmosphere","cast","pall","bewildered","plethora","options","decision","ineffable","charm",];
const masterWords = ["the cat sat on the mat","i like to eat apples","she walked slowly through the park","the sun shines brightly today","he plays the guitar very well","my favorite color is blue","they went to the beach yesterday","the birds chirped in the morning","she loves to read books","we enjoyed the movie last night","he ran fast to catch the bus","the flowers bloomed beautifully","i cooked dinner for my family","the dog barked loudly outside","she smiled when she saw him","they danced together at the party","he wrote a poem for her","we traveled to europe last summer","she laughed at his joke","the clock struck midnight","i bought a new phone yesterday","the rain poured heavily outside","they climbed the mountain together","the children played in the park","he fixed the broken chair","she sang a song for us","we watched the sunset on the beach","the teacher explained the lesson","he painted a picture of the ocean","she hugged her friend tightly","they celebrated their anniversary","i studied hard for the exam","the moonlight shone through the window","he cooked breakfast for everyone","she planted flowers in the garden","we built a sandcastle on the beach","the cat chased the mouse","he played basketball with his friends","she rode her bike to school","they watched a movie together","i cleaned my room this morning","the dog wagged its tail happily","she wrote a letter to her grandmother","we listened to music in the car","he read a book under the tree","she baked cookies for the party","they visited the museum downtown","i swam in the pool yesterday","the bird flew high in the sky"];



var difficultyButton = document.querySelectorAll(".difficulty button");

difficultyButton.forEach(function (button) {
  button.addEventListener("click", function () {
    difficultyButton.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});

var randomWords;

function genRanWord() {
  let ind = Math.floor(Math.random() * randomWords.length);
  return randomWords[ind];
}

function createWord() {
  var diff = document.querySelector(".active");
  var diffId = diff.getAttribute("id");
  var difficulty = diffId;

  word = document.createElement("div");
  word.setAttribute("class", "word");

  if (difficulty === "easy") {
    word.style.animationDuration = "12s";
    randomWords = Words;
  } else if (difficulty === "medium") {
    word.style.animationDuration = "8s";
    randomWords = Words;
  } else if (difficulty === "hard") {
    word.style.animationDuration = "5s";
    randomWords = Words;
  } else {
    word.style.animationDuration = "10s";
    randomWords = masterWords;
  }

  var counter = 0;

  let text = document.createElement("div");
  text.setAttribute("class", "text");
  ranWord = genRanWord();
  console.log(ranWord);
  text.innerText = ranWord;
  word.appendChild(text);

  let target = document.createElement("div");
  target.setAttribute("class", "target");
  text.appendChild(target);

  let img = document.createElement("img");
  img.src = "media/target.png";
  target.appendChild(img);

  card.appendChild(word);
  word.style.left = Math.random() * 450 + "px";

  var len = ranWord.length;

  document.addEventListener("keydown", function (event) {
    if (counter > 0) {
      text.style.color = "red";
    }
    console.log(event.key, ranWord[counter]);
    if (event.key === ranWord[counter]) {
      counter++;

      wordRect = card.querySelector(".word").getBoundingClientRect();

      img.src = "https://media.tenor.com/j-ixpElDGOYAAAAi/explode-boom.gif";
      setTimeout(() => {
        img.src = "media/target.png";
      }, 500);

      text.innerText = ranWord.slice(counter, len);
      text.appendChild(target);
      target.appendChild(img);

      var laser = document.createElement("div");
      laser.setAttribute("class", "laser");
      card.appendChild(laser);

      targetX = wordRect.left;
      targetY = wordRect.top;

      laser.style.left = 200 + "px";
      laser.style.top = 500 + "px";

      setTimeout(function () {
        laser.style.transition = "left 0.08s, top 0.08s"; // Add transition
        laser.style.left = targetX - 500 + "px";
        laser.style.top = targetY - 100 + "px";

        laser.addEventListener("transitionend", function () {
          card.removeChild(laser);
          if (wordRect.x < blue_bar.getBoundingClientRect().x) {
            blue_bar.style.boxShadow = "5px 0px 8px 5px red";
          }
        });
      }, 100);

      if (counter === ranWord.length) {
        score++;
        var explosion = this.createElement("img");
        explosion.setAttribute("class", "explosion");
        explosion.src =
          "https://media.tenor.com/ptNG8DQFPD4AAAAi/explotion-explode.gif";
        word.removeChild(text);
        word.appendChild(explosion);

        setTimeout(() => {
          card.removeChild(word);
          createWord();
        }, 800);
        counter = 0;
      }
    } else {
      console.log("Wrong word");
    }
  });

  function checkWordPosition() {
    wordRect = card.querySelector(".word").getBoundingClientRect();
    // console.log(wordRect.y , blue_bar.getBoundingClientRect().x)

    if (wordRect.y > 580) {
      blue_bar.style.boxShadow = "5px 0px 8px 5px red";
    } else {
      blue_bar.style.boxShadow = "5px 0px 8px 5px aqua";
    }

    if (wordRect.y > 650) {
      scoreWin.innerHTML = `YOUR SCORE: ${score}`
      console.log("gameOver");
      card.style.backgroundImage = "url('https://i.gifer.com/1lMg.gif')";
      card2.style.display = "none";
      blue_bar.style.display = "none";
      canon.style.display = "none";
      card.removeChild(word);

      setTimeout(function () {
        card.style.backgroundImage =
          "url('https://zty.pe/media/background/gradient.png')";
        card2.style.display = "block";
        newGame.style.display = "flex";
      }, 1500);

    }
    requestAnimationFrame(checkWordPosition);
  }
  checkWordPosition();
}

var start = document.querySelector(".start");
var newGame = document.querySelector(".new-game");

start.addEventListener("click", function () {
  score = 0;
  newGame.style.display = "none";
  card.style.backgroundImage =
    'url("https://media1.tenor.com/m/6AfvnXHB1pcAAAAC/get-ready-on-the-dance-floor-newyear.gif")';

  setTimeout(() => {
    card.style.backgroundImage =
      "url('https://zty.pe/media/background/gradient.png')";
    card2.style.display = "block";
    blue_bar.style.display = "block";
    canon.style.display = "block";
    createWord();
  }, 1400); //2500
});
