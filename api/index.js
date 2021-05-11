const RecordRoute = require('./record/record_route');

exports.setRoutes = (app) => {
  // Record route
  app.use('/api/v1/record', RecordRoute);
};
