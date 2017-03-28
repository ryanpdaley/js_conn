exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER TABLE milestones ADD COLUMN famous_person_id INTEGER;'),
    knex.schema.raw('ALTER TABLE milestones ADD FOREIGN KEY (famous_person_id) REFERENCES famous_people(id);')
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER TABLE milestones DROP CONSTRAINT famous_person_id;'),
    knex.schema.raw('ALTER TABLE milestones DROP COLUMN famous_person_id;')
  ])
};