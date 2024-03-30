import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './swaggerDefinition.js';

const options = {
  swaggerDefinition,
  apis: ['./routes/pricingRoutes.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
