import { characters } from '/potter.js'

let cardContainer = document.querySelector('#card-container')
let wantedProps = ['house', "dateOfBirth", "ancestry", "patronus", "actor", "alive"]

//BUTTONS
let noneButton = document.querySelector("#none-button")
let HouseButton = document.querySelector("#house-button")
let studentsStaffButton = document.querySelector("#students-staff-button")
let bloodStatusButton = document.querySelector("#blood-status-button")
let buttonList = [noneButton, HouseButton, studentsStaffButton, bloodStatusButton]

//MAIN FUNCTIONS --------------------------------------------------------------
let removeCards = () => {
    let removeDiv = document.getElementById("card-container");
    while (removeDiv.firstChild) {
        removeDiv.removeChild(removeDiv.firstChild);
    }
    buttonList.forEach(button => button.classList.remove('current-button'))
}

let createCard = (character) => {
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
    noneButton.classList.add('current-button')
    characters.forEach(character => {
        createCard(character);
    })
}

allCharacters();
noneButton.addEventListener("click", allCharacters)


//FILTER FUNCTIONS --------------------------------------------------------------

//Sort by House
let houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]

let sortByHouse = () => {
    removeCards()
    HouseButton.classList.add('current-button')
    houses.forEach(house => {
        let filteredByHouse = characters.filter(character => character.house === house)
        
        let houseName = document.createElement('h2')
        houseName.textContent = house
        houseName.classList.add("house-heading", `${house}`)
        cardContainer.appendChild(houseName)

        filteredByHouse.forEach(character => {
            createCard(character)
        })
    })
}

HouseButton.addEventListener("click", sortByHouse)

//Sort by Students and Staff 
let sortByStudentStaff = () => {
    removeCards()
    studentsStaffButton.classList.add('current-button')
    let students = characters.filter(character => character.hogwartsStudent === true)

    let studentHeading = document.createElement('h2')
    studentHeading.classList.add('sort-heading')
    studentHeading.textContent = "Students"
    cardContainer.appendChild(studentHeading)

    students.forEach(student => {
        createCard(student)
    })

    let staff = characters.filter(character => character.hogwartsStaff === true)

    let staffHeading = document.createElement('h2')
    staffHeading.classList.add('sort-heading')
    staffHeading.textContent = "Staff"
    cardContainer.appendChild(staffHeading)

    staff.forEach(person => {
        createCard(person)
    })

}

studentsStaffButton.addEventListener("click", sortByStudentStaff)

//Sort by Blood Status
let bloodTypes = []
characters.forEach(character => {
    if (bloodTypes.includes(character.ancestry) === false) {
        if (character.ancestry !== "")
            bloodTypes.push(character.ancestry)
    }
})

let sortbyBloodStatus = () => {
    removeCards()
    bloodStatusButton.classList.add('current-button')
    bloodTypes.forEach(type => {
        let filteredbyBlood = characters.filter(character => character.ancestry === type)
        
        let bloodName = document.createElement('h2')
        bloodName.textContent = type
        bloodName.classList.add("sort-heading")
        cardContainer.appendChild(bloodName)

        filteredbyBlood.forEach(character => {
            createCard(character)
        })
    })
}

bloodStatusButton.addEventListener("click", sortbyBloodStatus)

//USER CREATES NEW CARDS --------------------------------------------------------------

// let formName = document.querySelector('#form-name')
// let formImg = document.querySelector('#form-img')
let createCardButton = document.querySelector('#create-card-button')

let userCard = {
    "name":"John Doe",
    "house":"Gryffindor",
    "dateOfBirth":"31-07-1980",
    "ancestry":"half-blood",
    "patronus":"stag",
    "hogwartsStudent":true,
    "hogwartsStaff":false,
    "actor":"Daniel Radcliffe",
    "alive":true,
    "image":"http://hp-api.herokuapp.com/images/harry.jpg"
}

createCardButton.addEventListener("click", () => {
    characters.push(userCard)
    return createCard(userCard)
})