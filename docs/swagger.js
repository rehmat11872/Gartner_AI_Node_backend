import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for Grant Management, User Authentication, and Questions',
      contact: {
        name: 'Granter',
        email: 'granter@example.com',
        url: 'https://your-repo-url.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://granteater-ai-node-backend.vercel.app' 
          : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger UI route
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Raw Swagger JSON
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Swagger Docs available at ${process.env.NODE_ENV === 'production' ? 'https://granteater-ai-node-backend.vercel.app/api/docs' : `http://localhost:${port}/api/docs`}`);
  // console.log(`Swagger Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
