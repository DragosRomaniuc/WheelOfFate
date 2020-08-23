import mongoose from 'mongoose'

import {
  username,
  password,
  database,
  host,
  dialect,
  options,
  url
} from './config';

import debug from 'debug';
const error = debug('setup:error');
const info = debug('setup:info');

mongoose.connection.on('connected', () => {
  console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})

mongoose.connection.on('error', (error: any) => {
  console.error(error)
});

(async () => {
  try{
    await mongoose.connect(url, options);
    console.log(`Successfully connected to MongoDB ${database} with user ${username}.`);
  } catch (e) {
    console.error(e.message || e);
  }
})()

export default mongoose;