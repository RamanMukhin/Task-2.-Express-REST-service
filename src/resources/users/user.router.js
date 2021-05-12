const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.post(req);
  // map user fields to exclude secret fields like "password"
  res.statusCode = 201;
  res.json(User.toResponse(user));
});

module.exports = router;
