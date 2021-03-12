// require filesystem (fs) module
const fs = require('fs');
// require chalk npm package for user experience
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...';
};

const addNote = (title, body) => {
  // must load all notes ( if any ) before adding a new note
  const notes = loadNotes();

  /*
   * // using array .filter() to check duplicate title
   * const duplicateNotes = notes.filter((item) => item.title === title);
   */

  // more memory efficient than above method
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    // array push() the new note to the existing notes ( if any )
    notes.push({
      title,
      body,
    });

    // function call to save updated notes
    saveNotes(notes);
    console.log('New note has been added, successfully!');
  } else {
    console.log('Sorry, but this title is already taken.');
  }
};

const removeNote = (title) => {
  // function call to load all existing notes
  const notes = loadNotes();

  try {
    // filter to check if title exists
    const checkNotes = notes.filter((item) => item.title === title);

    // conditional based if title exists
    if (checkNotes.length > 0) {
      const updatedNotes = notes.filter((item) => item.title !== title);

      saveNotes(updatedNotes);
      console.log(chalk.bgGreen(`The note "${title}" has been removed.`));
    } else {
      throw new Error(`${title} doesn't exist.`);
    }
  } catch (error) {
    console.log(chalk.bgRed(error.message));
  }
};

const listNotes = () => {
  // function call to load all existing notes
  const notes = loadNotes();

  // printing note header
  console.log(chalk.bold.red('Here are your notes:'));

  // looping through notes using forEach
  notes.forEach((note, index) => console.log(`${index + 1}. ${note.title}`));
};

const readNote = (title) => {
  // function call to load all existing notes
  const notes = loadNotes();

  // .find() to find the title ( if it exists )
  const noteToRead = notes.find((note) => note.title === title);

  // conditional display based on the title .find() result
  if (noteToRead) {
    console.log(chalk.magentaBright.bold(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.bold('No note found?'));
  }
};

/*
 * Helper functions
 */
const saveNotes = (notes) => {
  // save the updated array list of notes
  const updatedNotes = JSON.stringify(notes);
  fs.writeFileSync('notes.json', updatedNotes);
};

const loadNotes = () => {
  // try-catch prevents the server from throwing an error if
  // notes.json file does not exist yet
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
