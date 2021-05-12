const mongoose = require('mongoose');
const app = require('./index');

const MONGODB_URI = process.env.MONGODB_URI;
const mongodbOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

let retry_count = 0;
const connectDBWithRetry = () => {
  console.log('Trying to connect MongoDB...');
  mongoose
    .connect(MONGODB_URI, mongodbOptions)
    .then(() => {
      console.log('MongoDB Connection: OK');
      listen();
    })
    .catch((err) => {
      console.log(
        'MongoDB connection unsuccessful, retry after 5 seconds. ',
        ++retry_count
      );
      setTimeout(connectDBWithRetry, 5000);
    });
};

// Try to connect DB.
connectDBWithRetry();

// Start server listening
const listen = () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};
