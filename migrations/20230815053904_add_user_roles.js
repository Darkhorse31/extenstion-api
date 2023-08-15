exports.up = function(knex) {
    return knex.schema.table('userlist', function(table) {
      table.boolean('super_admin').defaultTo(false);
      table.boolean('admin').defaultTo(false);
      table.boolean('user').defaultTo(true);
      table.text('admin_name')
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('userlist', function(table) {
      table.dropColumn('super_admin');
      table.dropColumn('admin');
      table.dropColumn('user');
      table.dropColumn('admin_name');
    });
  };
  
//   raw querry 
// ALTER TABLE your_table_name
//       ADD COLUMN super_admin BOOLEAN DEFAULT false,
//       ADD COLUMN admin BOOLEAN DEFAULT false,
//       ADD COLUMN user BOOLEAN DEFAULT true;