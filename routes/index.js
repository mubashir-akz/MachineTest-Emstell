var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('login', { title: 'Express' });
});

// Post :-- LoginValidation
router.post('/login',()=>{

})

router.get('/register',(req,res)=>{
  res.render('register')
})

module.exports = router;
