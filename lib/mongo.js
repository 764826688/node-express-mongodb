var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment'); // 自增id
mongoose.connect('mongodb://localhost/local',{ useNewUrlParser: true });
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on("error", function (error) {  
    console.log("数据库连接失败：" + error);
});

db.on("open", function () {  
    console.log("数据库连接成功"); 
})

db.on('disconnected', function () {    
    console.log('数据库连接断开');  
})
module.exports = {mongoose,autoIncrement};