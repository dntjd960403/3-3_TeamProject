const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'swagger 만들기',
  },
  host: '3.35.231.116',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoints',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'cookie', // can be "header", "query" or "cookie"
      name: process.env.COOKIE_NAME, // name of the header, query parameter or cookie
      description: 'any description...',
    },
  },
  definitions: {
    signup: {
      father: 'Simon Doe',
      mother: 'Marie Doe',
    },
    User: {
      userId: 1,
      $nickname: 'aaa',
      $password: '1111',
    },
    AddUser: {
      $name: 'Jhon Doe',
      $age: 29,
      about: '',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
