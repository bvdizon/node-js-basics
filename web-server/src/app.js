const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express(); // instantiating express
const port = 3000; // defining the port to render

// Define paths for express configuration
const publicDirectory = path.join(__dirname, '../public'); // declaring the path to the public folder
const viewsPath = path.join(__dirname, '../templates/views'); // Customizing the Views Directory
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // setting the view engine setting
app.set('views', viewsPath); // setting the views to let express.js where to look
hbs.registerPartials(partialsPath);

// Setting up static directory to serve
app.use(express.static(publicDirectory));

// Basic routing
app.get('/weather', (req, resp) => {
  resp.send('Hello express! From weather page.');
});

// Routing with hbs templates
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home - Learning Node.js',
    author: 'Brian Dizon',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    author: 'Brian Dizon',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    author: 'Brian Dizon',
    message:
      "Sea. Own had replenish midst given. Called meat Set isn't good face moved second. Which don't multiply after for upon so also rule moveth was. You'll heaven seasons all man male it.",
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found.',
    author: 'Brian Dizon',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found.',
    author: 'Brian Dizon',
  });
});

// kickstart the app
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
