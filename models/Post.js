var mongodb = require('./db');
var postClass= 'posts';
function Post(userName,title,content){
    this.userName = userName;
    this.title = title;
    this.content= content;
}
module.exports = Post;

Post.prototype.save = function(callback){
    var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    };
    var post= {
        userName : this.userName,
        title: this.title,
        time : time,
        content: this.content
    };
    return mongodb.saveObj(postClass,post,callback);
};
Post.prototype.get = function(userName,callback){
    var postParam  = {userName :userName};
    return mongodb.getObjList(postClass,postParam,callback);
};
