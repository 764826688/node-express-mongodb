var CaseModel = require('../models/case');
module.exports = {
    /**
     * 添加数据
     * @param {*} data 
     */
    save(data) {
        return new Promise((resolve,reject)=>{
            CaseModel.create(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
        })
    },
    find(data={}, fields=null, options={}) {
		return new Promise((resolve, reject) => {
			//model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
			CaseModel.find(data, fields, options, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},
	findRelated(data, fields, options,relateOptions){
		return new Promise((resolve,reject)=>{
			CaseModel.find(data, fields, options)
			.populate({relateOptions})
			.exec((err,obj)=>{
				if (err){
					reject(err)
				}else{
					resolve(obj)
				}
			})
		})
	},
    findOne(data) {
		return new Promise((resolve, reject) => {
			//model.findOne(需要查找的对象,callback)
			CaseModel.findOne(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},
	findById(data) {
		return new Promise((resolve, reject) => {
			//model.findById(需要查找的id对象 ,callback)
			CaseModel.findById(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},
	update(conditions, update) {
		return new Promise((resolve, reject) => {
			//model.update(查询条件,更新对象,callback)
			CaseModel.update(conditions, update, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},
	remove(conditions) {
		return new Promise((resolve, reject) => {
			CaseModel.remove(conditions, (error, doc) => {
				console.log(conditions)
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	}
}