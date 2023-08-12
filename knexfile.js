module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.pass,
      database: process.env.db,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: 'dpg-cj7mjq4l975s738o8bm0-a.oregon-postgres.render.com',
//       database: 'extapp',
//       user: 'prateek12',
//       password: 'WKzRWBoNOulcQmXPFtCufthwHcxTLwFV',
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations',
//     },
//     seeds: {
//       directory: './seeds',
//     },
//   },
// };