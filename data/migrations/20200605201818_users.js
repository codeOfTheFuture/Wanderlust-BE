exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.string("uid").primary();

    users.string("email", 255).unique();

    users.boolean("isTourGuide");

    users.string("first_name", 255);

    users.string("last_name", 255);

    users.integer("phone_number", 255);

    users.boolean("isRegistered");

    users.string("profilePhoto", 500);

    users.string("displayName", 255).unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
