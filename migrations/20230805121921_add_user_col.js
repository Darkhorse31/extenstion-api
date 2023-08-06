exports.up = function (knex) {
    return knex.schema.alterTable('batches', function (table) {
      table.string('username').notNullable();
    
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('batches', function (table) {
      table.dropColumn('username');
        });
  };