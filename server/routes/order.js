/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const router = require('express').Router();

const { Order } = require('../db/models');

router.post('/', async (req, res) => {
  const arr = req.body;
  const order = [];
  for (let i = 0; i < arr.length; i += 1) {
    const obj = await Order.create({
      excursion_name: arr[i].excursion_name,
      excursion_id: arr[i].excursion_id,
      count: arr[i].count,
      price: arr[i].price,
      totalPrice: arr[i].totalPrice,
      user_id: arr[i].user_id,
      order_nr: arr[i].order_nr,
    });
    order.push(obj);
  }
  res.json(order);
});
router.get('/:id', async (req, res) => {
  const personalOrder = Order.findAll({ where: { user_id: req.params.id } });
  res.json(personalOrder);
});

module.exports = router;
