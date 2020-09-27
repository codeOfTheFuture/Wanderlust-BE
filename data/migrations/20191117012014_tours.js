exports.up = function (knex) {
  return knex.schema.createTable("tours", (tours) => {
    tours.increments();

    tours
      .string("user_id")
      .unsigned()
      .notNullable()
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tours.string("tourname", 255).notNullable();

    tours.string("tourdescription", 255).notNullable();

    tours.string("tourguidephonenumber", 255);

    tours.string("recommendedage", 255).notNullable();

    tours.string("category", 255);

    tours.string("country", 255);

    tours.string("state", 255);

    tours.string("city", 255);

    tours.string("address", 255);

    tours.integer("lat");

    tours.integer("lng");

    tours.integer("date");

    tours.integer("price").unsigned().notNullable();

    tours.integer("durationhrs").unsigned().notNullable();

    tours.string("full_address", 255);

    tours.string("whattobring", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tours");
};
