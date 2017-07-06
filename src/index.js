const App = require('./app');
const config = require('./config/environment/index');

const app = new App();

app
  .run()
  .then(() => {
    console.warn('Server started', {
      port: config.port
    });
  })
  .catch(error => {
    console.error(
      'Terminating app due to MongoDB initial connection fail',
      {error});
    return setTimeout(() => process.exit(-1), 1000);
  });
