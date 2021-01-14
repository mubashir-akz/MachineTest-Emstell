var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const userHelpers = require('../helpers/userHelpers')
const expressSession = require('express-session')

router.use(expressSession({ secret: 'thisiskey', saveUninitialized: true, resave: false }))
/* GET home page. */
router.get('/', (req, res) => {
  res.render('login', { title: 'Express' });
});

// Post :-- LoginValidation
router.post('/login', async (req, res) => {
  const validation = await userHelpers.loginValidation(req.body);
  if (validation.status) {
    req.session.users = validation
    res.json({ status: true })
  } else {
    res.json({ status: false })
  }
})

router.get('/register', (req, res) => {
  res.render('register')
})


// POST :-- registerValidation
router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword
  const addToDb = await userHelpers.RegistrationValidation(req.body);
  res.json(addToDb)
})





// eslint-disable-next-line no-undef
module.exports = router;
