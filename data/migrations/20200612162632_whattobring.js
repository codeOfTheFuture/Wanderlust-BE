exports.up = function (knex) {
  return knex.schema.createTable("whattobring", (whattobring) => {
    whattobring.increments();

    whattobring
      .integer("tour_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tours")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    whattobring.string("item").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("whattobring");
};
