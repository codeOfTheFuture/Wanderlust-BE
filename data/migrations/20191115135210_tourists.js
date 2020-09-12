exports.up = function(knex) {
  return knex.schema.createTable('tourists', tourists => {
    tourists.increments();

    tourists
      .string('username', 255)
      .notNullable()
      .unique();

    tourists.string('password', 255).notNullable();

    tourists.boolean('isTourGuide').notNullable();

    tourists.string('email', 255).unique();

    tourists.string('firstname', 255);

    tourists.string('lastname', 255);

    tourists.string('phonenumber');

    tourists.string('profilepicture', 255).unique();

    tourists.string('bannerpicture', 255).unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tourists');
};
