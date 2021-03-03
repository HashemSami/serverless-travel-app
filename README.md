# Serverless Travel App

## Generel info

This project for the Udacity Cloud Devoleper Nanodegree. Where we build a cloud-based application.
This application was built using [Reactjs](https://reactjs.org/docs/getting-started.html) for the frontend, and a serverless backend using [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) and [Serverless framework](https://www.serverless.com/framework/docs/)

It is a travel planner app that obtains a desired trip location & date from the authenticated user, and pulls weather and country information, and an image url about the location using information obtained from external APIs, and saves it in a database using a serverless backend, to allow the user to display trips and update the existing image for each trip.

This project is using 4 external APIs, each one is reliant on another to make the app work. As one API will be required to get data from another API.

You can use the form to enter the location you are traveling to and the date you are leaving, then you will get a predicted weather forecast.

The APIs used are:

- Integrate the [REST Countries API](https://restcountries.eu/) to pull in information about the country being visited.
- [Weatherbit](https://www.weatherbit.io/api) API, that takes in location coordinates to provide weather data.
- to get these coordinates, [Geonames](http://www.geonames.org/export/web-services.html) API was used.
- Once all of this data obtained, an image of the location will be displayed for the user using [pixabay](https://pixabay.com/api/docs/) API.

## Technologies

- nodejs
- aws
- serverless
- react
- Auth0
- Axios

## Setup

### Installation requirments

- If you don't have Nodejs installed yet. you'll need to [download Node.js](https://nodejs.org/en/download/) to be able to use this application.
- install serverless framework to enable you to use the backend code on your aws lambda. make sure to [configuring your AWS credentials](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/) to allow the framework to make changes on your aws account.
- Clone this repo and install the dependencies by running `npm i` for the frontend and backend projects

### Run the application

### Backend

- To deploy an application run the following command:

```bash
   sls deploy -v
```

### Frontend

To run a client application first edit the client/src/config.ts file to set correct parameters. And then run the following command:

```bash
   npm run start
```
