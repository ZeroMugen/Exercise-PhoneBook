
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const phonebookFile = 'Phone_Book.json';
let phonebook = [];

// load phonebook from file
try {
  const data = fs.readFileSync(phonebookFile, 'utf8');
  phonebook = JSON.parse(data);
} catch (err) {
  console.error(err);
}

// save phonebook to file
function savePhonebook() {
  fs.writeFileSync(phonebookFile, JSON.stringify(phonebook));
}

// read person record
function readPerson(callback) {
  rl.question('Enter name: ', name => {
    rl.question('Enter phone number: ', phoneNumber => {
      callback({ name, phoneNumber });
    });
  });
}

// display all person records
function displayPhonebook() {
  console.log('Phonebook:');
  phonebook.forEach(person => {
    console.log(`${person.name}: ${person.phoneNumber}`);
  });
}

// find person by name
function findPersonByName(name) {
  return phonebook.find(person => person.name === name);
}

// add new person record
function addPerson() {
  readPerson(person => {
    phonebook.push(person);
    savePhonebook();
    console.log('Person added.');
    displayPhonebook();
    rl.close();
  });
 
}

// update person record
function updatePerson() {
  rl.question('Enter name of person to update: ', name => {
    const person = findPersonByName(name);
    if (!person) {
      console.log('Person not found.');
      rl.close();
      return;
    }
    readPerson(newPerson => {
      Object.assign(person, newPerson);
      savePhonebook();
      console.log('Person updated.');
      displayPhonebook();
      rl.close();
    });
  });
 
}

// delete person record
function deletePerson() {
  rl.question('Enter name of person to delete: ', name => {
    const index = phonebook.findIndex(person => person.name === name);
    if (index === -1) {
      console.log('Person not found.');
      rl.close();
      return;
    }
    phonebook.splice(index, 1);
    savePhonebook();
    console.log('Person deleted.');
    displayPhonebook();
    rl.close();
    return;
  });
  
}

// display instructions
function showMenu(){
console.log('Phonebook commands:');
console.log('  1: add a new person');
console.log('  2: update an existing person');
console.log('  3: delete an existing person');
console.log('  4: list all persons');
console.log('  5: exit the program');
// handle user input
rl.question('Select Option: ', command => {
  switch (command) {
    case '1':
      addPerson();
      break;
    case '2':
      updatePerson();
      break;
    case '3':
      deletePerson();
      break;
    case '4':
      displayPhonebook();
      rl.close();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Invalid input.');
      rl.close();
      break;
    }
   });
  }

showMenu();
