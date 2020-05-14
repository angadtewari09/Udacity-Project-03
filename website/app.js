/* Universal Variables */
// HTML element to listen for click events
const button = document.getElementById('generate');

// HTML elements to get the values
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

// HTML elements to update dynamically
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// OpenWeatherApi configuration
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' ;
const APIKey = '&APPID=f776b152b7c00409616908635de88c9b' ;

// Create a new date instance dynamically with JS
let din = new Date()
let newDate =  din.getDate() + ' / ' + (din.getMonth() + 1)  + ' / ' + din.getFullYear()

// Fetch Weather Data from OpenWeatherApi
const fetchWeather = async (baseURL, zip, apiKey) => {
  try {
    const request = await fetch(`${baseURL}${zip},us&units=metric${apiKey}`);
    const result = await request.json();
    // destructuring of the result object
    const {
      main: {temp},
    } = result
    return temp
  } catch (e) {
    console.error(e);
  }
}

// POST Request to store date, temp and user input
const saveData = async (baseURL, data) => {
  try {
    await fetch(baseURL, {
      method: 'POST',
      mode: 'cors' ,
      credentials: 'same-origin' ,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.error("error", e);
  }
}

// Update UI dynamically
const updateUI = async (temperature, newDate, feelings) => {
  date.innerText = newDate
  temp.innerText = `${temperature} deg`
  content.innerText = feelings
};

// Event listener
button.addEventListener('click', () => {
  fetchWeather(baseURL, zip.value, APIKey)
    .then(temp => {
      return {date: newDate, temp, content: feelings.value}
    })
    .then(data => {
      saveData('/api/projectdata', data)
      return data
    })
    .then(({temp, date, content}) => updateUI(temp, date, content))
    .catch(e => {
      // There can be proper error handling with UI
      console.error(e)
    })
});