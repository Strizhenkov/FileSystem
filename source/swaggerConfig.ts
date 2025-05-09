import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Файловый API',
        version: '1.0.0',
        description: 'API для файловой системы',
      },
    },
    apis: ['./source/Controller/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);