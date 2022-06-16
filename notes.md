# Project notes

This file contains all the notes and important instructions to the project.

## Setup the project - Step by step

- Create a `package.json` file - `npm init -y`
- Install the dependencies:
    - [bcrypt](https://www.npmjs.com/package/bcrypt) - `npm i bcrypt` - create a hash from a string and decodes the hash
    - [dotenv](https://www.npmjs.com/package/dotenv) - `npm i dotenv` -  create a configuration file to register sensitive information
    - [express](https://www.npmjs.com/package/express) - `npm i express`- to create routes to API
    - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - `npm i jsonwebtoken` - to handle the token
    - [mongoose](https://www.npmjs.com/package/mongoose) - `npm i mongoose` - to handle the mongoDB
- Install the dev dependencies:
    - [nodemon](https://www.npmjs.com/package/nodemon) - `npm i --save-dev nodemon` - create a server to run the app
- Create a script command inside the `package.json` to start the application. `"start": "nodemon app.js"`