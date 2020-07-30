const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'Vendor',
        version: '0.1.0',
        description : 'Api document for vendors'
    },
    basePath: '/',
    servers: [
        {
            url: 'http://localhost:8080/',
            description: 'localhost'
        }
    ],
};

const options ={
    swaggerDefinition,
    contact: {
        name: 'Anu',
        email: 'anuvarthini12@gmail.com'
    },
    apis: ['./src/**/*.js']
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
