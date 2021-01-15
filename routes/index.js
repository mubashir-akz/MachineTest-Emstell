const express = require('express');
const expressSession = require('express-session')
const router = express.Router();
const MongoStore = require("connect-mongo")(expressSession);
const bcrypt = require('bcrypt')
const userHelpers = require('../helpers/userHelpers')

router.use(
  expressSession({
    name: "users",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ url: "mongodb://localhost:27017/MachineTest" }),
    secret: "secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10,
    },
  })
);


// middle wares
function validateUser(req, res, next) {
  if (req.session.users) {
    next()
  } else {
    res.redirect('/')
  }
}

function loginValidater(req, res, next) {
  if (req.session.users) {
    res.redirect('/home')
  } else {
    next()
  }
}

/* GET home page. */
router.get('/',loginValidater, (req, res) => {
  res.render('login', { title: 'Express' });
});
 
// Post :-- LoginValidation
router.post('/login',loginValidater, async (req, res) => {
  const validation = await userHelpers.loginValidation(req.body);
  if (validation.status) {
    req.session.users = validation.data[0]
    res.json({ status: true })
  } else {
    res.json({ status: false })
  }
})

router.get('/register',loginValidater, (req, res) => {
  res.render('register')
})

router.get('/home', validateUser, async (req, res) => {
  const datas = await userHelpers.getTodo(req.session.users._id)
  const count = datas.length
  res.render('home', { datas,count, name: req.session.users.Username })
})

// POST :-- registerValidation
router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword
  const addToDb = await userHelpers.RegistrationValidation(req.body);
  res.json(addToDb)
})

router.post('/addTodo', validateUser, async (req, res) => {
  await userHelpers.addTodo(req.body, req.session.users._id).then((data) => {
    res.json({ data })
  })
})

router.get('/removeTodo/:id', validateUser, async (req, res) => {
  await userHelpers.removeTodo(req.params.id).then(() => {
    res.redirect('/home')
  })
})

router.post('/editTodo', validateUser, async (req, res) => {
  await userHelpers.editTodo(req.body.id, req.body.text).then(() => {
    res.json({ status: true })
  })
})
router.post('/deleteAllTodo', validateUser, async (req, res) => {
  await userHelpers.deleteAllTodo(req.session.users._id).then(() => {
    res.json({ status: true })
  })
})

router.get('/logout', (req, res) => {
  req.session.users = ''
  res.redirect('/')
})
// eslint-disable-next-line no-undef
module.exports = router;
