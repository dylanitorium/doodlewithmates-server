import {
  host,
  port,
  path,
} from './config';


export const mongoUri = `mongodb://${host}:${port}/${path}`;


export default (mongoose) => {
  mongoose.connect(mongoUri);
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', console.error.bind(console, 'Mongoose connection error:'));
  mongoose.connection.once('open', () => {
    console.info('----------'); // eslint-disable-line no-console
    console.info(`Mongoose connected to ${mongoUri}`); // eslint-disable-line no-console
    console.info('==========');// eslint-disable-line no-console
  });
};
