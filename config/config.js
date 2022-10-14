module.exports = {
  development: {
    'url': 'postgresql://uc6mjgkx5vra5jvk56sm:7QvXx1OllhjoZZenbUIW@b1has4odgk17fngqihhc-postgresql.services.clever-cloud.com:5432/b1has4odgk17fngqihhc',
    "dialect": "postgres"
  },
  test: {
    url: '127.0.0.1',
    dialect: "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
}
