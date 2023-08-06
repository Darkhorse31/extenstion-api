exports.up = function (knex) {
    return knex.schema.createTable("userlist", function (table) {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("mobile");
      table.integer("number_of_batches");
      table.string("password");
      table.boolean("edit_option");
      table.boolean("delete_option");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("userlist");
  };
  