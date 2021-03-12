// require filesystem npm module
const fs = require('fs');

// read from json.json file and convert to js object,
// convert buffer data to json, then to js object
const dataBuffer = fs.readFileSync('json.json');
const data = JSON.parse(dataBuffer.toString());

// updating the values for name and age properties
(data.name = 'Brian Dizon'), (data.age = '37 years old');

// writing to json.json file the updated values,
// first converting data back to json format 'JSON.stringify()'
fs.writeFileSync('json.json', JSON.stringify(data));

// checking the results
console.log(fs.readFileSync('json.json').toString());
