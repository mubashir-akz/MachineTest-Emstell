var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res)=> {
  res.render('login', { title: 'Express' });
});

// Post :-- LoginValidation
router.post('/login',()=>{

})

router.get('/register',(req,res)=>{
  res.render('register')
})
// POST :-- registerValidation
router.post('/register',(req)=>{
  console.log(req.body);
})
// eslint-disable-next-line no-undef
module.exports = router;
