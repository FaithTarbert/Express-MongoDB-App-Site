var express = require('express');
var router = express.Router();
const { check, validationResult} = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', [
    check('username', 'Please Enter A User Name With 5 Or More Characters')
      .isLength({ min: 5}),
    check('password', 'Please Enter A Password With 8 Or More Characters'
    ).isLength({ min: 8})
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      //use postman route http://localhost:3005/users header set as content-type application/json, body as raw, empty json object to test
      return res.status(400).json({ errors: errors.array() });
    }

    res.render('User Route');
  }
);

module.exports = router;
