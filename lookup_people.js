const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

nameQuery = process.argv[2];

const findPeople = (nameToSearch, callback) => {
  client.connect((err) => {
    if (err) throw err;

    let query = `SELECT * FROM famous_people WHERE (first_name = $1::text) OR (last_name = $1::text);`;

  client.query(query, [nameToSearch], (err, result) => {
      if (err) {
        console.log("Something went wrong:", err);
        callback([]);
      }
      else {
        callback(result.rows);
      }
      client.end(); // Close db connection - if we don't do this the app doesn't close.
    });
  })};

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