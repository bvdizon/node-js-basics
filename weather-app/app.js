// requiring own js files
const geocode = require('./utilitites/geocode.js');
const forecast = require('./utilitites/forecast.js');

// accessing the command line without yargs
// capture the user input: node app.js Boston
// items inside double quotes is considered one item array
const cityArgs = process.argv[2];

// call to function geocode, passing arguments
// passing the user input from process.argv
geocode(cityArgs, (err, resp) => {
  if (!cityArgs) {
    return console.log('Please provide a valid city name.');
  }

  if (err) {
    return console.log(err);
  }

  forecast(resp.latitude, resp.longitude, (errForecast, respForecast) => {
    if (errForecast) {
      return console.log('Error', errForecast);
    }
    // console.log(respForecast);
    const {
      location: { name },
      current: { weather_descriptions },
    } = respForecast;
    console.log('You search for the weather condition of ', name);
    console.log(
      `Is is currently ${weather_descriptions} in ${resp.location}.  `
    );
  });
});
