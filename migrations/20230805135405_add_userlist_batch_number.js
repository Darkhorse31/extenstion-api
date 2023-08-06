exports.up = function (knex) {
    return knex.schema.alterTable('userlist', function (table) {
      table.string('batch');
    
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('userlist', function (table) {
      table.dropColumn('batch');
        });
  };