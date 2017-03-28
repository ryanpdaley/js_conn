const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


let first_name = process.argv[2];
let last_name = process.argv[3];
let birthdate = process.argv[4];

function addPerson(first_name, last_name, birthdate) {
  knex('famous_people').insert({first_name: first_name, last_name: last_name, birthdate: birthdate})
  .catch(function(e) {
    console.error(e);
  })
  .then(function () {
      return knex.destroy();
  })
  .then(function () {
      console.log('all done');
  });
}

addPerson(first_name, last_name, birthdate)