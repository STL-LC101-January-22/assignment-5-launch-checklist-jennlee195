// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
    let inputType = "---"
    if (testInput === ""){
        inputType = "Empty String"
    } else if (isNaN(testInput) == true){
        inputType = "Not a Number"
    } else if (isNaN(testInput) == false){
        inputType = "Is a Number"
    }
    return inputType
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");
        
        
        if (validateInput(pilotName) != "Not a Number" || validateInput(copilotName) != "Not a Number" ) {
           alert("Invalid Pilot/Copilot Name!");
           // stop the form submission
           event.preventDefault();
        }
        if (validateInput(fuelLevel) != "Is a Number" || validateInput(cargoMass) != "Is a Number") {
            alert("Invalid Fuel Lavel/Cargo Mass")
            // stop the form submission
            event.preventDefault();
        }
     });
   
}

async function myFetch() {
    let planetsReturned = [];

    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
         console.log(json);
      });
   });

    planetsReturned = await fetch().then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
