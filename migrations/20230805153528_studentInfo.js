exports.up = function(knex) {
    return knex.schema.createTable('studentInfo', function(table) {
      table.increments('uid').primary();
      table.text('name');
      table.text('contact');
      table.text('adhaar');
      table.text('address');
      table.json ('photo1');
      table.json ('photo2');
      table.json ('photo3');
      table.json ('photo4');
      table.json ('photo5');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('studentInfo');
  };
  