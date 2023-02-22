// Fetch Countries in the first and get all countries data in the select field..

fetch('https://countriesnow.space/api/v0.1/countries')
.then((Response)=>{
   
    return Response.json();
}).then((data)=>{
    var countries = `<option value="">Select</option>`;
    data.data.forEach(country => {
        countries += `<option value="${country.country}">${country.country}</option>`; //...Get Country Names and value too
    });
    document.querySelector(".countries").innerHTML = countries;  //Push all data in the countries after fetch 
}).catch((error)=>{
    console.log("Error", error);
})


var mySelect = document.getElementById("mySelect");
var selectedvalue 
var countryPopulation = document.querySelector('.countryPopulation')


mySelect.addEventListener("change",  () => {    //..Implement change function on select
selectedvalue = mySelect.value;                 //..Declare inside the function block


 fetch('https://countriesnow.space/api/v0.1/countries/population')  //...Fetch api for getting the population of country vise...
.then((response)=>{
    return response.json();
}).then((data)=>{
    
    data.data.forEach(countrydata => {
        if (selectedvalue == countrydata.country) {  //Apply Condition that if selectedvalue and country name is equal so pust population to us..
            let lastElement =  countrydata.populationCounts[countrydata.populationCounts.length - 1] //Target last alement of the array
            document.querySelector(".countryPopulation").innerText = lastElement.value
           return true;
        }     
    })
     myStates(); //.. Call next function inside the onchange function for contine process step by stap
});
})



var allStates 
var statesField = document.querySelector('.statesField')
var lableShowState = document.querySelector('.lableShowState')


function myStates(){           
    lableShowState.classList.remove("d-none");      //...lable show here
    statesField.classList.remove("d-none");         //...States field show here

fetch('https://countriesnow.space/api/v0.1/countries/states')//..Fetch api for getting the states
.then((response)=>{
    console.log(response);
    return response.json();
}).then((data)=>{

    console.log(data);
    data.data.forEach(statesData=>{
        if(selectedvalue == statesData.name){  //.Again condilion apply that if country in the selected vaue and statesdata.name is equal so pust the specific country states.
            statesData.states.forEach(state=>{
                 allStates += `<option value="${state.name}">${state.name}</option>`;
            })
        }
    })
    statesField.innerHTML = allStates
})
}



var selectedState 
var citiesField = document.querySelector('.citiesField')
var mySelectState = document.getElementById("mySelectState"); 
var allCities

var lableShowCity = document.querySelector('.lableShowCity')
mySelectState.addEventListener('change', () =>{
selectedState = mySelectState.value


var raw = `{\n    \"country\": \"${selectedvalue}\",\n    \"state\": \"${selectedState}\"\n}`;  

fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: raw,
})
.then((response) => response.json())
.then((data) => {
    lableShowCity.classList.remove("d-none");
    citiesField.classList.remove("d-none");
    console.log(data);
    data.data.forEach(citiesData=>{
       
          allCities += `<option value="${citiesData}">${citiesData}</option>`;
           citiesField.innerHTML = allCities
    })
})
.catch((error) => {
    console.error('Error:', error);
});
})



    
var mySelectCities = document.getElementById("mySelectCities");
var selectedcity 
var cityPopulation = document.querySelector('.cityPopulation');

mySelectCities.addEventListener("change",  () => {
        selectedcity = mySelectCities.value;

    fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        console.log(selectedcity , 'HIiiii');
      data.data.forEach(citydata => {
        console.log(citydata,"citydata");
        if (selectedcity == citydata.city) {
            
            let cityPop =  citydata.populationCounts[0]
            document.querySelector(".cityPopulation").innerText = cityPop.value
           return true;
           
        }     
    })
})
    
      .catch(error => console.log('error', error));


    })   



