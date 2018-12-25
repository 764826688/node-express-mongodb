var express = require('express');
var router = express.Router();
var api = require("../lib/api");

/* GET cases listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/case', function (req, res, next) {
  var cases = {};
  Object.assign(cases, req.body);
  api.save(cases)
    .then(result => {
      res.status(200);
      res.json({ msg: '保存成功', data: result._id })
    })
    .catch(err => {
      res.status(500);
      res.json({ msg: '保存失败' + err })
    })
})

router.get('/case', function (req, res, next) {
  let pageSize = Number(req.query.pageSize);
  let pageNum = Number(req.query.pageNum);
  let length = 0;
  api.find({}, null, { limit: pageSize, skip: pageNum - 1 })
    .then(result => {
      length = result.length;
      res.status(200);
      res.json({
        total: result.length,
        list: result,
        pages: length > pageSize ? length % pageSize > 0 ? parseInt(length / pageSize) + 1 : parseInt(length / pageSize) : 1
      })
    })
    .catch(err => {
      res.status(500);
      res.json({ msg: '获取数据失败' + err })
    })
})

router.put('/case', function (req, res, next) {
  api.update({ id: req.body.id }, req.body)
    .then(result => {
      res.status(200);
      res.json({ msg: '修改成功' })
    })
    .catch(err => {
      res.status(500);
      res.json({ msg: '修改失败' + err })
    })
})
router.delete('/case', function (req, res, next) {
  api.remove({ id: Number(req.query.id )})
    .then(result => {
      res.status(200);
      res.json({ msg: '删除成功' })
    })
    .catch(err => {
      res.status(500);
      res.json({ msg: '删除失败' + err })
    })
})
module.exports = router;
