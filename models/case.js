var {mongoose,autoIncrement} = require("../lib/mongo")
// 案例模型
var CaseSchema = new mongoose.Schema({
    id: {type:Number,index:true,unique:true},
    anhao : {type:String},
    susongfei : {type:Number},
    lianriqi: {type:String},
    dangshiren: {type:String},
    shouananyou: {type:String},
    chengbanren: {type:String},
    chengbanbumen: {type:String},
    jieanriqi: {type:String},
    anjianxingzhi: {type:String},
    avatar: {type:String},
    count: {type:String},
    fileList: {type:String}
});
// 添加索引
CaseSchema.index({ id:1 }, { unique: true });
//创建Model
CaseSchema.plugin(autoIncrement.plugin, {
    model: 'case',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});
var CaseModel = mongoose.model("case", CaseSchema );
module.exports = CaseModel