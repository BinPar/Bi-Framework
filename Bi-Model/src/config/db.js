/* eslint-disable no-console */
import mongoose from 'mongoose';
import settings from './settings';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

try {
  mongoose.connect(settings.mongoURL, {
    useMongoClient: true,
  });
} catch (err) {
  mongoose.createConnection(settings.mongoURL, {
    useMongoClient: true,
  });
}

mongoose.connection.once('open', () => console.log('Connected to MongoDB')).on('error', (e) => {
  throw e;
});
