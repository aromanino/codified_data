var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis-store');
const uuidv1 = require('uuid/v1');
var propertiesmanager = require('propertiesmanager').conf;


exports.setup = function (option) {
    redisCache = cacheManager.caching({
        store: redisStore,
        host:  option.host || propertiesmanager.host,
        port:  option.port || propertiesmanager.port,
        db: option.db || propertiesmanager.db,
        ttl: option.ttl || propertiesmanager.ttl,
        auth_pass:option.auth_pass || propertiesmanager.auth_pass
    });

    if(option.clear){
        cacheFlush();
    }

};


exports.setKey = function (value,options,callback) {
    if(!callback) {
        callback = options;
        options={};
    }
    var uuId=uuidv1();
    redisCache.set(uuId, value, options, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null,uuId);
        }
    });
};



exports.deleteKey = function (key,callback) {
    deleteK(key,callback);
};

exports.getKey = function (key,options,callback) {
    if(!callback) {
        callback = options;
        options=null;
    }
    redisCache.get(key, function (err, result){
        if (err) {
            callback(err);
        } else {
            if(options.delete){
                deleteK(key,function(err){
                    callback(null,result);
                });
            }else callback(null,result);
        }
    });
};




exports.keys = function (callback) {
    redisCache.keys(function(err,keys) {
        if (err) {
            callback(err);
        } else {
            callback(null,keys);
        }
    });
};



exports.flushAll = function (callback) {
    cacheFlush(callback);
};



exports.getTtl = function (key,callback) {

    redisCache.ttl(key, function (err, result){
        if (err) {
            callback(err);
        } else {
            result=(result==-1)? "unlimited" : (result==-2) ? "expired" : result;
            callback(null,result);
        }
    });
};

function cacheFlush(callback) {

    if (!callback) {
        callback = function callback(err, result) {
            console.log("!! cache flushed !!");
        };
    }

    redisCache.reset(function(err,data) {
        if (err) {
            callback(err);
        } else {
            callback(null,data);
        }
    });
};

function deleteK(key,callback) {
    console.log("Delete REQ");
    redisCache.del(key, function(err){
        if (err) {
            callback(err);
        } else {
            callback(null,key);
        }
    });
};
