# FEND Capstone - Travel App

## Generel info

This project is for Udacity's front end nanodegree that requires you to build out a travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

This project is using 3 external APIs, each one is reliant on another to make the app work. As one API will be required to get data from another API.

You can use the form to enter the location you are traveling to and the date you are leaving, then you will get a predicted weather forecast.

The APIs used are:

- [Weatherbit](https://www.weatherbit.io/api) API, it takes in coordinates to provide weather data.
- to get these coordinates, [Geonames](http://www.geonames.org/export/web-services.html) API was used.
- Once all of this data obtained, an image of the location will be displayed for the user using [pixabay](https://pixabay.com/api/docs/) API.

This is all going to be done in a Webpack environment, using an express server, and wrapped up with service workers.

#### Features in the app:

- Allow the user to add additional trips that will be displayed in a list sorted from the newest entry.
- Incorporate [Weatherbit icons](https://www.weatherbit.io/api/codes) into forecast.
- Pull in an image for the region from Pixabay API when the entered location brings up no results.
- Integrate the [REST Countries API](https://restcountries.eu/) to pull in data for the country being visited.

#### The goal of this project is to practice with:

- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Technologies

- HTML
- CSS
- Javascript
- nodejs
- Webpack
- Sass
- Jest

## Dependencies

- express
- webpack
- babel
- jest
- node-fetch
- cors
- body-parser

## Setup

- Clone this repo.
- Install the dependencies by running `npm i` in your terminal.
- You'll need to setup your own APIs to be able to use this project:

  ## Setting up APIs

  - First, you will need to go to [Weatherbit](https://www.weatherbit.io/api), [Geonames](http://www.geonames.org/export/web-services.html) and [pixabay](https://pixabay.com/api/docs/). Sign up to each one of them to get your API keys.
  - Next you need to declare the API keys by saving them as an environment variables. Create a new `.env` file in the root of the project.
  - Fill the .env file with your API keys like this:

    **Note:**
    _in `GEONAME_USERNAME` variable, you only need to add your user name that you signed up with._
    _In case if you start the app for the first time and got a `Geo name error` on the console, that is because Geoname sevice requires an extra step to activate you API by [login](https://www.geonames.org/login) to you account with your username and password, and activate the API. Once you are done you can use the api in the app._

  ```
   GEONAME_USERNAME=**************************
   WEATHERBIT_API_KEY=**************************
   PIXABAY_KEY=**************************
  ```

- run `npm run build-prod` to create the production folders.
- run `npm run start` to start the server.
- open your browser on localhost:8081 to see the app running.

  ### run the app for development and testing:

  - run `npm run build-dev` to initiate the webpack server for development work.
  - run `npm run test` to start testing the test files located in the `__test__` folder.
