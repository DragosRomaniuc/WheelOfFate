export {};

require('dotenv').config()

const { 
  DB_USER, 
  DB_PASS, 
  DB_HOST,
  DB_PORT,
  DB_DEV_DB_NAME,
  DB_TEST_DB_NAME,
  NODE_ENV
} = process.env;

const databaseCredentials = {
  "development": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_DEV_DB_NAME,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mongodb"
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_TEST_DB_NAME,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mongodb"
  }
};

const { username, password, database, host, port, dialect } = databaseCredentials[NODE_ENV];

const url = `mongodb://${host}${port ? `:${port}` : ''}${database ? `/${database}` : ''}`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

export {
  username,
  password,
  database,
  host,
  dialect,
  options,
  url
};
