import { characters } from '/potter.js'

let cardContainer = document.querySelector('#card-container')
let wantedProps = ['house', "dateOfBirth", "ancestry", "patronus", "actor", "alive"]

characters.forEach(character => {
    let scene = document.createElement('div')
    scene.className = "scene"
    cardContainer.appendChild(scene)

    let card = document.createElement('div')
    card.className = "card"
    scene.appendChild(card)

    //Creates front of card
    let fig = document.createElement('figure')
    fig.classList.add('card-face')
    fig.classList.add('front')
    card.appendChild(fig)

    let img = document.createElement('img')
    img.src = character.image
    let cap = document.createElement('figcaption')
    cap.textContent = character.name
    fig.appendChild(img)
    fig.appendChild(cap)

    //Creates back of card
    let backDiv = document.createElement('div')
    backDiv.classList.add('card-face')
    backDiv.classList.add('back')
    card.appendChild(backDiv)

    let backNameHeading = document.createElement('h2')
    backNameHeading.className = "back-name-heading"
    backNameHeading.textContent = character.name
    backDiv.appendChild(backNameHeading)

    let propList = document.createElement('div')
    propList.className = "prop-list"
    backDiv.appendChild(propList)

    for (let prop in character) {
        if (wantedProps.includes(prop)) {
            let ul = document.createElement('ul')
            propList.appendChild(ul)

            let propKey = document.createElement('li')
            propKey.textContent = `${prop.charAt(0).toUpperCase() + prop.slice(1)}:`
            ul.appendChild(propKey)
            let propValue = document.createElement('li')
            propValue.textContent = character[prop]
            // console.log(`${prop.charAt(0).toUpperCase() + prop.slice(1)}:`)
            ul.appendChild(propValue)
        }
    }

    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });
})