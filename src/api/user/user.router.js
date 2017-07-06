const Express = require('express');
const controller = require('./user.controller.js');
const asyncWrapper = require('../../asyncWrapper.helper');
const router = Express.Router();

router.get('/', controller.getList);
router.post('/', controller.create);

module.exports = router;
