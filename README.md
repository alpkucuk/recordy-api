# Recordy REST API

A REST API to filter some records by date and count.

## Libraries and tools used including:
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com), [Mongoose](https://mongoosejs.com/)
- [SwaggerJSDoc](https://github.com/Surnet/swagger-jsdoc), [SwaggerUI](https://github.com/scottie1984/swagger-ui-express)
- [Helmet](https://github.com/helmetjs/helmet), [Cors](https://github.com/expressjs/cors)
- [Jest](https://jestjs.io/)

### Getting Started
Clone this repository and install dependencies
```
$ git clone https://github.com/alpkucuk/recordy-api.git
$ cd recordy-api

$ npm install
```

#### Create .env file at root of the project with following content:
```
# Port that application will listen for connections.
PORT=5000
# MongoDB URI that application will connect.
MONGODB_URI=<YOUR_MONGODB_URI>
```

#### Run development with nodemon
```
$ npm run dev
```

#### Build and run for production
```
$ npm run start
```

#### Tests
```
// Unit tests
$ npm run test:unit

// Integration Tests
$ npm run test:int

// Run both tests
$ npm run test
```

### API endpoint
Recordy API has a single endpoint: **POST /api/v1/record**

### API documentation
Checkout `http://localhost:5000/api/v1/docs`.

### Heroku
You can also access to [Recordy API](https://recordy-api.herokuapp.com/api/v1/docs/) running on Heroku.
