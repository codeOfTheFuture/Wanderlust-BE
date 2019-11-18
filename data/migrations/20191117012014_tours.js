exports.up = function(knex) {
  return knex.schema.createTable('tours', tours => {
    tours.increments();

    tours
      .integer('guide_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('guides')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tours
      .integer('tourist_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tourists');

    tours.string('tourname', 255).notNullable();

    tours.string('tourdescription', 255).notNullable();

    tours
      .string('tourguidephonenumber', 255)
      .notNullable()
      .unique();

    tours.string('recommendedage', 255).notNullable();

    tours.string('whattobring', 255).notNullable();

    tours.string('category', 255).notNullable();

    tours.string('area', 255).notNullable();

    tours
      .integer('price')
      .unsigned()
      .notNullable();

    tours
      .integer('durationhrs')
      .unsigned()
      .notNullable();

    tours
      .string('meetingaddress', 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tours');
};
