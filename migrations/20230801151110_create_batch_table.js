exports.up = function (knex) {
    return knex.schema.createTable('batches', function (table) {
      table.increments('id').primary();
      table.text('batch_type').notNullable();
     
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('batches');
  };
  