// Write your JavaScript code here!
const functions = require("./scriptHelper.js");

let form = window.document.querySelector("form");
form.addEventListener("submit", function  (event) {
    event.preventDefault();
    let pilotName = document.querySelector("input[name='pilotName']").value;
    let copilotName = document.querySelector("input[name='copilotName']").value;
    let fuelLevel = document.querySelector("input[name='fuelLevel']").value;
    let cargoMass = document.querySelector("input[name='cargoMass']").value;
    functions.formSubmission(document, null, pilotName, copilotName, fuelLevel, cargoMass)
});

window.addEventListener("load", async function () {
    let listedPlanetsResponse = await functions.myFetch()
    let planet = functions.pickPlanet(listedPlanetsResponse)
    functions.addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
})