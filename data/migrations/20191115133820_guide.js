exports.up = function(knex) {
  return knex.schema.createTable('guides', guides => {
    guides.increments();

    guides
      .string('username', 255)
      .notNullable()
      .unique();

    guides.string('password', 255).notNullable();

    guides.boolean('isTourGuide').notNullable();

    guides.string('email', 255).unique();

    guides.string('firstname', 255);

    guides.string('lastname', 255);

    guides.string('phonenumber');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('guides');
};
