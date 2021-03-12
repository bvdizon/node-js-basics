// require npm packages
const chalk = require('chalk');
const { demandOption } = require('yargs');
const yargs = require('yargs');

// require own js file
const notes = require('./notes.js');

// customize yargs version
yargs.version('1.0.0');

/*
 * Creating add, remove, list and read commands
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, // requires to enter ---title="some value"
      type: 'string', // will require value to be a string
    },
    body: {
      // this was added in response to the course challenge
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    // argv here is coming from builder object
    // calling a function to add a new note; requires to parameters
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title to delete',
      type: 'string',
      demandOption: true,
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title to read.',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// this is required, else that it will not work;
// for node knows that you don't need to access yargs.argv
// console.log(yargs.argv);
yargs.parse();

// alternative for this is --- yargs.parse()
// which will not require arguments
