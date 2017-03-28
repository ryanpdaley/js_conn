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


let nameQuery = process.argv[2];

const findPeople = (nameToSearch, callback) => {
  knex.select('*').from('famous_people').where('first_name', '=', nameToSearch).orWhere('last_name', '=', nameToSearch)
  .map(function (row) { return row; })
  .then (function (data) {
      data = data || [];
      callback(data);
    })
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

findPeople(nameQuery, function(results) {
  if (results.length > 0) {
    let outString = `Found ${results.length} person(s) by the name '${nameQuery}':`
    for (let i in results) {
       outString += `\n- ${results[i].id}: ${results[i].first_name} ${results[i].last_name}, born '${results[i].birthdate}'`
    }
    console.log(outString)
  } else {
    console.log(`Nobody was found in the database with the name: '${nameQuery}'`)
  }
});