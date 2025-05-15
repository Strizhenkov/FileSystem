import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Файловый API',
        version: '1.0.0',
        description: 'API для файловой системы',
      },
      tags: [
        {
          name: 'File',
          description: 'Операции с файлами',
        },
        {
          name: 'Directory',
          description: 'Операции с директориями',
        },
      ],
    },
    apis: ['./source/Controller/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);