import { characters } from '/potter.js'

let cardContainer = document.querySelector('#card-container')

characters.forEach(character => {
    let fig = document.createElement('figure')
    let img = document.createElement('img')
    let cap = document.createElement('figcaption')
    
    img.src = character.image
    cap.textContent = character.name
    
    cardContainer.appendChild(fig)
    fig.appendChild(img)
    fig.appendChild(cap)
})