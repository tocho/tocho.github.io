var crypto = require('crypto'),
    User = require('../models/User.js');

var loginAction = {};

  loginAction.get = function(req,res,app){
    res.render('login',{
        title:'登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
  };
  loginAction.post = function(req,res,app){
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
        var newUser = new User({name:req.body.name,passwd:'',passwd_re:'',email:''});
        //检查用户是否存在
        newUser.get(req.body.name, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在!'); 
            return res.redirect('/login');//用户不存在则跳转到登录页
        }
        //检查密码是否一致
        console.log("req-pssswd"+req.body.password);
        console.log("re-passwd-encode"+password);
        console.log("user-passwd"+user.passwd);
        if (user.passwd != password) {
            req.flash('error', '密码错误!'); 
            return res.redirect('/login');//密码错误则跳转到登录页
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        req.flash('success', '登陆成功!');
        res.redirect('/');//登陆成功后跳转到主页
    });
  };

module.exports = loginAction;
