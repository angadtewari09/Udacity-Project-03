/*Empty JS object to act as the endpoint for all routes*/
projectData={}
/*Express to run the server and all the routes*/
const express = require('express');
/*Creating an instance of app*/
const app = express();
/*Including dependencies*/
const bodyParser = require('body-parser');
/*Body parser as MIDDLEWARE*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
/* Initializing the main project folder*/
app.use(express.static('website'));
const port =3000;
const server = app.listen(port ,listening);

function listening() {
    console.log(`running on local host : ${port}` );
};
/*GET data*/
app.get('/api/projectdata' , sendData);
function sendData (request ,  response) {
console.log(`your GET request accepted`);
    response.send(projectData);
};

//POST request
app.post('/api/projectdata' , (request ,response) => {
    const{date, temp, content} = request.body
    projectData[date] = {
        temp,
        content,
    }
    response.send()
});