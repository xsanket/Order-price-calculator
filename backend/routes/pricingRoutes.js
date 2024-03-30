/**
 * @swagger
 * /api/pricing:
 *   post:
 *     description: Calculate pricing based on zone, distance, and item type
 *     parameters:
 *       - name: pricingInfo
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             zone:
 *               type: string
 *               enum: [central, eastern, western]
 *               description: select zone (Select from central, eastern, western)
 *             organizationId:
 *               type: integer
 *               description: The organization ID  (Numeric value)
 *             totalDistance:
 *               type: integer
 *               description: The total distance  (in KM)
 *             itemType:
 *               type: string
 *               enum: [perishable, non-perishable]
 *               description: select item type (Select from perishable, non-perishable)
 *     responses:
 *       200:
 *         description: Successfully calculated pricing
 *       400:
 *         description: Missing required fields or invalid input
 */




import express from 'express';

const router = express.Router();

router.post('/pricing', async (req, res) => {
  try {
    const { zone, organizationId, totalDistance, itemType } = req.body;
    console.log("the data: ",req.body);

    if (!zone || !organizationId || !totalDistance || !itemType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // const query = 'SELECT base_price FROM zone_prices WHERE zone = $1';
    // const { rows } = await Sequelize.query(query, [zone]);
    // if (rows.length === 0) {
    //   return res.status(400).json({ error: 'Zone not found in pricing data' });
    // }

  

    //given data:
    const baseDistance = 5;
    let basePrice = 10;
    


    // if (zone === 'Eastern') {
    //   basePrice = 12;
    // } else if (zone === 'Western') {
    //   basePrice = 15;
    // }
    // else {
    //   basePrice = 10
    // }

    const perKmPrice = itemType === 'perishable' ? 1.5 : 1;
    console.log("perKmPrice=", perKmPrice)

    let totalPrice = basePrice;
    console.log("totalPrice=", totalPrice)

    if (totalDistance > baseDistance) {
      const extraDistance = totalDistance - baseDistance;
      console.log("extra distance=", extraDistance)
      totalPrice += extraDistance * perKmPrice;
     console.log("total price now=", totalPrice)
    }


    // euros to cents
    const totalPriceCents = Math.round(totalPrice * 100);
    console.log("total price in cents now=", totalPriceCents)

    return res.json({ total_price: `${totalPriceCents} cents` });
  }
  catch (error) {
    console.error('Error :', error);
    
  }
});

export default router;