exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.string("uid").primary();

    users.string("email", 255).unique();

    users.boolean("isTourGuide");

    users.boolean("rememberLogin").defaultTo(false);

    users.string("firstName", 255);

    users.string("lastName", 255);

    users.integer("phoneNumber", 255);

    users.boolean("isRegistered");

    users.string("photoURL", 500);

    users.string("displayName", 255).unique();

    users.string("creationTime", 255);

    users.string("lastSignInTime", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
