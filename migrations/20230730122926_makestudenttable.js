exports.up = function(knex) {
    return knex.schema.createTable('your_table_name', function(table) {
      table.increments('uid').primary();
      table.text('name');
      table.text('contact');
      table.text('adhaar');
      table.text('address');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('your_table_name');
  };
  