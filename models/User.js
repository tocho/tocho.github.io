var mongodb = require('./db');
var userClass = 'users';
function User(user){
    this.name = user.name;
    this.passwd = user.passwd;
    this.email = user.email;
}
module.exports = User;

User.prototype.save = function(callback){
    var user = {
        name : this.name,
        passwd : this.passwd,
        email : this.email
    };
    return mongodb.saveObj(userClass,user,callback);
};
User.prototype.get = function(name,callback){
    var userParam = {name :name};
    return mongodb.getObj(userClass,userParam,callback);
};
