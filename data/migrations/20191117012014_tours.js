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

    tours.string("tourguidephonenumber", 255).notNullable();

    tours.string("recommendedage", 255).notNullable();

    tours.string("category", 255);

    tours.string("country", 255).notNullable();

    tours.string("state", 255).notNullable();

    tours.string("city", 255).notNullable();

    tours.string("address", 255).notNullable();

    tours.integer("price").unsigned().notNullable();

    tours.integer("durationhrs").unsigned().notNullable();

    tours.string("meetingaddress", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tours");
};
