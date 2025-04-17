const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest API',
      version: '1.0.0',
      description: 'Modular Swagger API docs 🛠️',
    },
    servers: [
      {
        url: '/',
      },
    ]
  },
  apis: ['./routes/*.js','./docs/*.js'], // you can expand this to other folders too
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
