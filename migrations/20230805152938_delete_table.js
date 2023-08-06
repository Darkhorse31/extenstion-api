// migrations/timestamp_delete_table.js
exports.up = function (knex) {
    return knex.schema.dropTable('your_table_name');
  };
  
  exports.down = function (knex) {
    return knex.schema.createTable('your_table_name', (table) => {

      table.increments('id').primary();
      table.string('name');
      // Add other columns as needed.
    });
  };
  