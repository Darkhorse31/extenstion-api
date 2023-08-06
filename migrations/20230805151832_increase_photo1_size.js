
exports.up = function (knex) {
    return knex.schema.alterTable('your_table_name', (table) => {
    
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('your_table_name', (table) => {
    
    });
  };
  