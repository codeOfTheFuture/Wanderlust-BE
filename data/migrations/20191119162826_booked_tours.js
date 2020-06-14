exports.up = function(knex) {
  return knex.schema.createTable('bookedTours', bookedTour => {
    bookedTour.increments();

    bookedTour
      .integer('tour_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tours')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    bookedTour
      .integer('tourist_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tourists')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('bookedTours');
};
