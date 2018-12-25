var {mongoose,autoIncrement} = require("../lib/mongo")
var CourtSchema = new mongoose.Schema({
    id: {type:Number,index:true,unique:true},
    courtNo:{type:String},
    name:{type:String}
});
// 添加索引
CourtSchema.index({ id:1 }, { unique: true });
//创建Model
CourtSchema.plugin(autoIncrement.plugin, {
    model: 'court',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});
var CourtModel = mongoose.model("court", CourtSchema );
module.exports = CourtModel