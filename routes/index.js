var express = require('express');
var router = express.Router();
var model = require('../models/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  var username  = req.body.username,
      password  = req.body.password
  model.users
    .findOne({
      where: {
        username:username,
        password:password
      }
    })
      .then(function(result){
        console.log(result);
        console.log(result.first_name);
        res.render('home',{namadepan:result.first_name});
      })

});

router.post('/signup', function(req, res, next) {
  var username  = req.body.username,
      password  = req.body.password,
      namadepan = req.body.namadepan,
      namabelakang = req.body.namabelakang
  model.users
  .build({
    username:username,
    password:password,
    first_name:namadepan,
    last_name:namabelakang,
    createdAt:new Date(),
    updatedAt:new Date()
  })
    .save()
      .then(function(){
        console.log("-------new data inserted-------");
        console.log(`username:${username}, password:${password}, first_name:${namadepan}, last_name:${namabelakang}`);
      }).catch(function(error){
            console.log(error);
        })

  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;
