// Update with your config settings.
module.exports = {
  production: {
    client: process.env.NEXT_PUBLIC_DB_CLIENT,
    connection: {
      host: process.env.NEXT_PUBLIC_DB_HOST,
      user: process.env.NEXT_PUBLIC_DB_USERNAME,
      password: process.env.NEXT_PUBLIC_DB_PASSWORD,
      database: process.env.NEXT_PUBLIC_DB_NAME
    }
  }
};
