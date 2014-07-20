
/*
 * GET home page.
 */
var regPage = require('./reg.js');
var loginPage = require('./login.js');


//exports.index = function(req, res){
module.exports = function(app){
  app.get("/",function(req, res){
    res.render('index', { 
        title: '首页' ,
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
  });
  app.get('/login',checkNotLogin);
  app.get('/login',function(req,res){
        loginPage.get(req,res,app);
  });
  app.post('/login',checkNotLogin);
  app.post('/login',function(req,res){
        loginPage.post(req,res,app);
  });
  app.get('/reg',checkNotLogin);
  app.get('/reg',function(req,res){
        return regPage.get(req,res,app);
  });
  app.get('/post',checkLogin);
  app.get('/post',function(req,res){
    res.render('post',{title:'发表'});
  });
  app.get('/logout',checkLogin);
  app.get('/logout',function(req,res){
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.redirect('/');//登出成功后跳转到主页
  });
  app.post('/reg',checkNotLogin);
  app.post('/reg',function(req,res){
        return regPage.post(req,res,app);
  });



  function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录!'); 
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!'); 
      res.redirect('back');
    }
    next();
  }


};
