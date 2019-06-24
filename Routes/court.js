var express = require('express');
var router = express.Router();
var court = require('../lib/court');
var async = require('async');
var handleData = function (result) {
    return new Promise((resolve, rejet) => {
        var _result = JSON.parse(JSON.stringify(result));
        async.map(_result, (res, callback) => {
            court.find({ courtNo: { $regex: getRegex(res.courtNo) } })
                .then(_res => {
                    res.children = _res;
                    callback(null, res);
                })
        }, (error, result) => {
            const _res = result.filter(res => {
                return res.children.length > 0;
            })
            var arr = [];
            var obj;
            var finalArr = [];
            _res.forEach(_r => {
                const _arr = _res.filter(r => {
                    return getRegex(_r.courtNo).test(r.courtNo);
                })
                if (_arr.length > 0) {
                    delete _r.children
                    obj = _r;
                    if (arr.length === 0) {
                        arr = _arr;
                    } else {
                        arr.push(_arr);
                    }
                }
            })
            obj.children = arr;
            finalArr.push(obj);
            resolve(finalArr);
        })
    })
}
var getRegex = function (variate) {
    return new RegExp('^' + variate + '[0-9]+$')
}


router.get('/court/list', function (req, res, next) {
    court.find({}, null, {})
        .then(result => {
            handleData(result).then(data=>{
                res.status(200);
                res.json({data:data})
            });
        })
        .catch(err => {
            res.status(500);
            res.json({ msg: '获取失败' + err })
        })
})

router.post('/court', function (req, res, next) {
    var courts = {};
    Object.assign(courts, req.body);
    court.save(courts)
        .then(result => {
            res.status(200);
            res.json({ msg: '保存成功', data: result.id })
        })
        .catch(err => {
            res.status(500);
            res.json({ msg: '保存失败' + err })
        })

})
module.exports = router;