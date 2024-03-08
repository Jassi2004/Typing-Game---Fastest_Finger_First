var card = document.querySelector('.card')
var canon = document.querySelector('.canon')
// var word;

canon.addEventListener('click' , function(event){
    console.log("canon clicked");
    console.log("X coordinate:", event.clientX);
    console.log("Y coordinate:", event.clientY);
})
const randomWords = [
    'apple', 'banana', 'orange', 'grape', 'strawberry',
    'cherry', 'pineapple', 'watermelon', 'kiwi', 'mango',
    'blueberry', 'pear', 'lemon', 'peach', 'plum',
    'apricot', 'raspberry', 'blackberry', 'pomegranate', 'fig'
];

function genRanWord(){
    let ind = Math.floor(Math.random() * randomWords.length)
    return randomWords[ind];
}
function createWord(){

    console.log("hehe")

    let word = document.createElement('div');
    word.setAttribute('class' , 'word');

    let text = document.createElement('div');
    text.setAttribute('class' , 'text');
    let ranWord = genRanWord()
    console.log(ranWord)
    text.innerText = ranWord;
    word.appendChild(text);

    let target = document.createElement('div');
    target.setAttribute('class' , 'target');
    text.appendChild(target);

    let img = document.createElement('img');
    img.src = 'media/target.png'
    target.appendChild(img);

    card.appendChild(word);
    word.style.left = Math.random() * 450 + 'px'    

    setTimeout(function(){
        card.removeChild(word);
    }, 12000)


    

    document.addEventListener('keydown', function(event) {

        console.log("key pressed : " , event.key)

        var canonRect = canon.getBoundingClientRect()
        var wordRect = word.querySelector('.word').getBoundingClientRect()
        console.log(wordRect)
        // setInterval(()=>{
        //     console.log(canonRect.clientX , canonRect.clientY)
        //     console.log(wordRect.clientX , wordRect.clientY)
        // } , 1000)


    });
}

createWord()
// setInterval(function(){
//     createWord()

// },2000)

