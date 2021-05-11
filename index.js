const express = require('express');
const handleError = require('./middleware/handle_error');
const router = require('./api/index');
const ApiError = require('./util/api_error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register api routes
router.setRoutes(app);

// Handle unregistered routes
app.use((req, res, next) => {
  next(new ApiError(404, 'Requested API endpoint not found.'));
});

// Error handler
app.use(handleError);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
