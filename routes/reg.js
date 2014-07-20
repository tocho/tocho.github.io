var crypto = require('crypto'),
    User = require('../models/User.js');

var pageAction = {};

pageAction.get = function(req,res,app){
    res.render('reg',{
        title : '注册',
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
  };
pageAction.post = function(req,res,app){
    var name = req.body.name,
        passwd = req.body.password,
        passwd_re = req.body['password-repeat'];
        console.log(passwd);
        console.log(passwd_re);
        if(passwd != passwd_re){
            req.flash('error','两次输入的密码不一致！');
            console.log('passwd-match-error');
            return res.redirect('/reg');
        }
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newUser = new User({name:req.body.name,passwd:password,email:req.body.email});
        newUser.get(newUser.name,function(err,user){
            if(user){
                req.flash('error','用户已经存在！');
                return res.redirect('/reg');
            }
            newUser.save(function(err,user){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/reg');
                }
                req.session.user = user;
                req.flash('success','注册成功！');
                return res.redirect('/');
            });
        });
  };
module.exports = pageAction;
