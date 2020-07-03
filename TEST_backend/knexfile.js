// Update with your config settings.

module.exports = {


  client: 'postgresql',
  connection: {
    database: 'tasks',
    user: 'postgres',
    password: 'z1o2i3o4'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }


};
