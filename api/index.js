const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const RecordRoute = require('./record/record_route');

_configureSwaggerRoute = (app) => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Recordy API'
      },
      servers: [{ url: `http://localhost:${process.env.PORT}/api/v1` }]
    },
    apis: ['api/**/*.js']
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

exports.setRoutes = (app) => {
  // Api docs
  _configureSwaggerRoute(app);
  // Record route
  app.use('/api/v1/record', RecordRoute);
};
