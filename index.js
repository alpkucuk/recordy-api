const express = require('express');
const handleError = require('./middleware/handle_error');
const router = require('./api/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register api routes
router.setRoutes(app);

// Error handler
app.use(handleError);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
