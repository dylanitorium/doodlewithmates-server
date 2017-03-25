import config from '../environment';

const { HOST, PORT, PATH } = config.MONGO;

export const mongoUri = `mongodb://${HOST}:${PORT}/${PATH}`;


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
