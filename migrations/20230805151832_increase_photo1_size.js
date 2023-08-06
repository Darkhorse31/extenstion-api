
exports.up = function (knex) {
    return knex.schema.alterTable('your_table_name', (table) => {
      table.binary('photo1',45535).alter(); 
      table.binary('photo2',45535).alter(); 
      table.binary('photo3',45535).alter(); 
      table.binary('photo4',45535).alter(); 
      table.binary('photo5',45535).alter(); 
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('your_table_name', (table) => {
        table.binary('photo1').alter();
        table.binary('photo2').alter();
        table.binary('photo3').alter();
        table.binary('photo4').alter();
        table.binary('photo5').alter();
    });
  };
  