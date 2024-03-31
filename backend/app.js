import express from 'express';
import sequelize from './config/db.js';
import pricingRoutes from './routes/pricingRoutes.js';
import requestMiddleware from './middlewares/requestMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';

const app = express();
//middleware to parse the data
app.use(requestMiddleware);
//api call
app.use('/api', pricingRoutes);
//handle exception
app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;
//swagger  docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('db connection failed:', err);
  });


  // deployment config
  import express from 'express';
  import path from 'path';
  
 
  const __dirname = path.resolve();
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
  }

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


//test data
//  http://localhost:3000/api/pricing
//   { "zone": "central", "organizationId": "005",
// "totalDistance": 12, "itemType": "perishable" }