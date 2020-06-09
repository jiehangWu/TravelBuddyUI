import express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
  // GET/users/ route
  res.send({name: 'Luke'});
});

export default router;
