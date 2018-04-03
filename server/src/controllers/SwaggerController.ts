import swaggerJSDoc = require('swagger-jsdoc');
import  express from 'express';
import { Request, Response } from 'express-serve-static-core';

const SwaggerController = express.Router();

// swagger definition
const swaggerDefinition = {
    info: {
    title: 'Surfing API',
    version: '1.0.0',
    description: 'A service retrieving surfing information',
    },
    host: 'localhost:3001',
    basePath: '/',
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['dist/controllers/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

SwaggerController.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

export { SwaggerController };
