# Workflow
## Set up Project with Structure and NPM
1. Set up client and server directories within the main project folder. 
2. Note: packages.json philosophy is such that client and server directories get their own individual package.json files and then the project’s parent directory has a package.json file which encapsulates everything. The parent package.json will eventually contain global scripts for convenience of running files for both client and server from the project directory
3. If there are already front end files set up drag these into the client folder run the `npm install` command to install all the packages used (if any) for the front end.
4. If there are no client side files yet, then create a ‘src’ directory within the client directory. This will be where all source code will live
5. Navigate to the server directory
6. create the src directory here.
7. Intialize the folder with npm: `npm init -y`
8. Create the server.js file within the src directory
9. Install Express as a dependency: `npm install express --save`
10. Install Nodemon as a dev dependency: `npm install nodemon --save-dev`
11. Navigate to the package.json file to update properties:
	1. “name” - name this using dashes between words; project name. Ex: “nasa-project-api”
	2. “description”: no need for dashed here; example: “NASA Mission Control API”
	3. “main”: file path to server.js; “src/server.js”
	4. “scripts”: 
		1. add the “watch” script for nodemon: “nodemon src/server.js”
		2. add the “start” script for Express: “node src/server.js”
		3. These scripts are accessed via `npm run script-name`


## Server Setup
13. Set up the server.js file:
```
const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer(/*Express app goes here*/);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
```
12. Create the Express ‘app.js’ file. This is done within the server/src directory. 
13. Set up the Express app.js and export:
```
const express = require('express');

const app = express();

app.use(express.json());

module.exports = app;
```
14. Import the app module into our server file and update the .createServer argument:
```
const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
```

At this point the server is set up and ready for routes.

## Routes, Controllers, Models
### Set up Route
1. Within src directory create a new ‘routes’ directory.
2. Within this directory create a directory for each route that will be needed.
3. Note: Within each route directory we will have a relevant .router.js and .controller.js file
4. Navigate into the first router directory and create the router file. Example: `planets.router.js`
5. Set up the router file:
```
const express = require('express');

const planetsRouter = express.Router();
```
6. Create first route, which will lead to the first controller, getAllPlanets: `planetsRouter.get(‘/planets’, getAllPlanets);`

### Set Up Controller
7. Within the ‘planets’ directory, create a `planets.controller.js` file.
8. Set up the controller file with first controller, which will lead to the first model:
```
function getAllPlanets(req, res) {
    return res.status(200).json(planets);
}
```

### Set Up Model
9. Within the src directory create a new ‘models’ directory.
10. Within the models directory create a new model file. In this case it is `planets.model.js`
11. set up the models file.
12. Note that the model is generally the endpoint of all controllers. This makes sense because when a HTTP Request is being made, it is to an endpoint and so here we not only set up the models by we export the model as well.
```
const planets = [];

module.exports = planets;
```

### Finish the Controller File
13. We need to import the model the controller is dependent upon, then export the controller:
```
const planets = require('../../models/planets.model');

function getAllPlanets(req, res) {
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets,
}
```
	- Notice that when we export controllers, we generally want to do so as an object because normally there are multiple controllers per route/endpoint depending upon the request method or whether it was made to an endpoint item or collection.

### Finish the Router File 
14. We need to import the controller, then export the router:
```
const express = require('express');

const {
    getAllPlanets,
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;
```
	- Note: the import involves object destructuring as this provides more info in regards to what specifically we are using in the imported module.

### Finish the Express App file
15. We need to import our router, then we need to mount the router as middleware after any middleware within the app.js file:
```
const express = require('express');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

app.use(express.json());

app.use(planetsRouter);

module.exports = app;
```

# THAT’S IT! FOR REMAINING ROUTES JUST RINSE, REPEAT.