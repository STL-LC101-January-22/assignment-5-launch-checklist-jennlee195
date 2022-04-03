// Write your helper functions here!








const fetch = require("node-fetch");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.getElementById("missionTarget").innerHTML =

   ` <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${image}">`

}

function validateInput(testInput) {
    let inputType = "---"
    if (testInput === ""){
        inputType = "Empty"
    } else if (isNaN(testInput) == true){
        inputType = "Not a Number" //indicates a string
    } else if (isNaN(testInput) == false){
        inputType = "Is a Number"
    }
    return inputType
}

function formSubmission(document,list, pilotName, copilotName, fuelLevel, cargoMass) {
    let faultyList = document.getElementById("faultyItems")

    let noInputErrors = true

    let inputList = [{
        "inputId": "pilotName",
        "type": "Not a Number",
        "statusId": "pilotStatus",
        "readyText": "Pilot pilotName is ready for launch",
        "typeError": "Pilot name must not be a number",
        "userInput": pilotName
    },
        {
            "inputId": "copilotName",
            "type": "Not a Number",
            "statusId": "copilotStatus",
            "readyText": "Co-pilot copilotName is ready for launch",
            "typeError": "Co-pilot name must not be a number",
            "userInput": copilotName
        },
        {
            "inputId": "fuelLevel",
            "type": "Is a Number",
            "statusId": "fuelStatus",
            "readyText": "Fuel level high enough for launch",
            "notReadyText": "Fuel level too low for launch",
            "typeError": "Fuel level must be a number",
            "userInput": fuelLevel,
            "min": 10000
        },
        {
            "inputId": "cargoMass",
            "type": "Is a Number",
            "statusId": "cargoStatus",
            "readyText": "Cargo mass low enough for launch",
            "notReadyText": "Cargo mass too heavy for launch",
            "typeError": "Cargo mass must be a number",
            "userInput": cargoMass,
            "max": 10000
        }]


    try {
        for (let expectedInput in inputList) {
            let currentInput = inputList[expectedInput];
            // let userInput = document.querySelector(`input[name=${currentInput.inputId}]`).value;
            let inputStatus = document.getElementById(`${currentInput.statusId}`)
            if (currentInput.type === "Not a Number" && validateInput(currentInput.userInput) === "Not a Number") {
                inputStatus.textContent = currentInput.readyText.replace(currentInput.inputId, currentInput.userInput)
            } else if (currentInput.type === "Is a Number" && validateInput(currentInput.userInput) === "Is a Number") {
                if (currentInput["min"] && currentInput.min <= currentInput.userInput) {
                    inputStatus.textContent = currentInput.readyText
                } else if (currentInput["max"] && currentInput.max >= currentInput.userInput) {
                    inputStatus.textContent = currentInput.readyText
                } else {
                    inputStatus.textContent = currentInput.notReadyText
                    noInputErrors = false
                }
            } else if (validateInput(currentInput.userInput) === "Empty") {
                throw Error("empty input found")
            } else {
                // window.alert(currentInput.typeError);
                noInputErrors = false
            }
        }
        faultyList.style.visibility = "visible"
        setShuttleStatus(noInputErrors, document)

    } catch (e) {
        // window.alert("All fields are required!");
    }
}

function setShuttleStatus(shuttleReady, document) {
    let shuttleStatusElem = document.getElementById("launchStatus")
    if (shuttleReady) {
        shuttleStatusElem.textContent = "Shuttle is Ready for Launch"
        shuttleStatusElem.style.color = "rgb(65, 159, 106)"
    } else {
        shuttleStatusElem.textContent = "Shuttle Not Ready for Launch"
        shuttleStatusElem.style.color = "rgb(199, 37, 78)"
    }

}

async function myFetch() {
    let response = await fetch('https://handlers.education.launchcode.org/static/planets.json');
    return await response.json();
}

function pickPlanet(planets) {
    return planets[getRandomInt(planets.length)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
