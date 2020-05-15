/* Universal Variables */
const openWeatherMapBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiBaseURL = "http://localhost:3000/";
// Personal API Key for OpenWeatherMap API
const openWeatherMapAPIKey = "appid=f776b152b7c00409616908635de88c9b";

// HTML element to listen for click events
const button = document.getElementById('generate');
button.addEventListener("click", () => getDataFromOpenWeatherAPI(openWeatherMapAPIKey));

/* Function to GET Web API Data*/
async function getDataFromOpenWeatherAPI(apiKey) {
    let zipCode = document.getElementById("zip").value;
    fetch(`${openWeatherMapBaseURL}${zipCode},us&${apiKey}`).then((response) => {
        return response.json();
    }).then((result) => {
        postProjectData(result.main.temp);
    });
}

/* Function to GET Project Data */
async function getProjectData() {
    fetch(apiBaseURL + 'projectData').then((response) => {
        return response.json();
    }).then((result) => {
        document.getElementById("date").innerHTML = result.date;
        document.getElementById("temp").innerHTML = JSON.stringify(result.temp);
        document.getElementById("content").innerHTML = result.content;
        document.getElementById("zip").value = "";
        document.getElementById("feelings").value = "";
    });
}

// POST Request to store date, temp and user input
async function postProjectData(temp) {
    // Create a new date instance dynamically with JS
    let din = new Date();
    let newDate =  din.getDate()+'/'+(din.getMonth()+1)+'/'+ din.getFullYear();
    let content = document.getElementById("feelings").value;
    let data = {
        date: newDate,
        temp: temp,
        content: content,
    };
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    fetch(apiBaseURL + 'projectData', options).then((response) => {
        return response.json();
    }).then((result) => {
        getProjectData()
    });
}