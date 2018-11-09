import { characters } from '/potter.js'

let cardContainer = document.querySelector('#card-container')
let wantedProps = ['house', "dateOfBirth", "ancestry", "patronus", "actor", "alive"]

//BUTTONS
let noneButton = document.querySelector("#none-button")
let HouseButton = document.querySelector("#house-button")
let studentsStaffButton = document.querySelector("#students-staff-button")
let aliveDeadButton = document.querySelector("#alive-dead-button")

//MAIN FUNCTIONS --------------------------------------------------------------
let removeCards = () => {
    let removeDiv = document.getElementById("card-container");
    while (removeDiv.firstChild) {
        removeDiv.removeChild(removeDiv.firstChild);
    }
}

let createCards = (character) => {
    let scene = document.createElement('div')
    scene.className = "scene"
    cardContainer.appendChild(scene)

    let card = document.createElement('div')
    card.className = "card"
    scene.appendChild(card)

    //Creates front of card
    let fig = document.createElement('figure')
    fig.classList.add('card-face', 'front')
    card.appendChild(fig)

    let img = document.createElement('img')
    img.src = character.image
    let cap = document.createElement('figcaption')
    cap.textContent = character.name
    fig.appendChild(img)
    fig.appendChild(cap)

    //Creates back of card
    let backDiv = document.createElement('div')
    backDiv.classList.add('card-face', 'back')
    if (character.house !== "") {
        backDiv.classList.add(`${character.house}`)
    }
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
            ul.appendChild(propValue)
        }
    }

    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });
}

let allCharacters = () => {
    removeCards();
    characters.forEach(character => {
        createCards(character);
    })
}

allCharacters();
noneButton.addEventListener("click", allCharacters)


//FILTER FUNCTIONS --------------------------------------------------------------

//Sort by House
let houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]

let sortByHouse = () => {
    removeCards()
    houses.forEach(house => {
        let filteredByHouse = characters.filter(character => character.house === house)
        
        let houseName = document.createElement('h2')
        houseName.textContent = house
        houseName.classList.add("house-heading", `${house}`)
        cardContainer.appendChild(houseName)

        filteredByHouse.forEach(character => {
            createCards(character)
        })
    })
}

HouseButton.addEventListener("click", sortByHouse)

//Sort by Students and Staff 
let sortByStudentStaff = () => {
    removeCards()
    let students = characters.filter(character => character.hogwartsStudent === true)

    let studentHeading = document.createElement('h2')
    studentHeading.textContent = "Students"
    cardContainer.appendChild(studentHeading)

    students.forEach(student => {
        createCards(student)
    })

    let staff = characters.filter(character => character.hogwartsStaff === true)

    let staffHeading = document.createElement('h2')
    staffHeading.textContent = "Staff"
    cardContainer.appendChild(staffHeading)

    staff.forEach(person => {
        createCards(person)
    })

}

studentsStaffButton.addEventListener("click", sortByStudentStaff)