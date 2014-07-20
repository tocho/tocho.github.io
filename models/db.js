var settings = require("../settings");
	mongodb = require("mongodb");
	Db = mongodb.Db;
	Connection = mongodb.Connection;
	Server = mongodb.Server;
    mydb = new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT),{safe:true});

    mydb.saveObj = function(objClass,obj,callback){
        mydb.open(function (err,db){
            if(err){
                if(callback){return callback(err);}
                return err;
            }
            db.collection(objClass,function(err,collection){
                if(err){
                    mydb.close();
                    if(callback){return callback(err);}
                    return err;
                }
                collection.insert(obj,{safe:true},function(err,objs){
                    mydb.close();
                    if(err){
                        if(callback){callback(err);}
                        return err;
                    }
                    if(callback){
                        return callback(null,objs[0]);
                    }
                    return objs[0];
                });
            });
        });
    };
mydb.getObj = function(objClass,param,callback){
    mydb.open(function(err,db){
        if(err){
            if(callback){return callback(err);}
            return err;
        }
        db.collection(objClass,function(err,collection){
            if(err){
                mydb.close();
                if(callback){return callback(err);}
                return err;
            }
            collection.findOne(param,function(err,obj){
                mydb.close();
                if(err){
                    if(callback){return callback(err);}
                    return err;
                }
                if(callback){
                    return callback(null,obj);
                }
                return obj;
            });
        });
    });
};
mydb.getObjList = function(objClass,param,callback){
    mydb.open(function(err,db){
        if(err){
            if(callback){return callback(err);}
            return err;
        }
        db.collection(objClass,function(err,collection){
            if(err){
                mydb.close();
                if(callback){return callback(err);}
                return err;
            }
            if(param.sortParam){
                collection.find(param).sort(param.sortParam).toArray(function(err,objList){
                    mydb.close();
                    if(err){
                        if(callback){return callback(err);}
                        return err;
                    }
                    if(callback){
                        return callback(null,objList);
                    }
                    return objList;
                });
            }else{
                collection.find(param).toArray(function(err,objList){
                    mydb.close();
                    if(err){
                        if(callback){return callback(err);}
                        return err;
                    }
                    if(callback){
                    return callback(null,objList);
                    }
                    return objList;
                });
            }

        });
    });
};
module.exports=mydb;
