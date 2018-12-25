var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var courtRouter = require('./routes/court');
var usersRouter = require('./routes/case');

var app = express(); // 实例化express
var multer = require('multer');
// 将文件存到磁盘
var storage = multer.diskStorage({
  destination: 'public/upload',
  filename: function (req, file, cb) {
    cb(null, new Date().getTime()+'.'+file.mimetype.split('/')[1])
  }
})
var limits = {
  fields: 2,
  fileSize: 10240000,
  files: 10
}
var fileFilter = function (req, file, cb) {
  // // 拒绝这个文件，使用`false`，像这样:
  // cb(null, false)

  // // 接受这个文件，使用`true`，像这样:
  cb(null, true)

  // // 如果有问题，你可以总是这样发送一个错误:
  // cb(new Error('I don\'t have a clue!'))

}
var upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter })
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "multipart/form-data;charset=utf-8");
  //header头信息设置结束后，结束程序往下执行，返回
  if (req.method.toLocaleLowerCase() === 'options') {
    res.status(204);
    return res.json({});   //直接返回空数据，结束此次请求
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 因为执行的是app.js文件，所以同级创建了views文件夹
app.set('view engine', 'ejs'); // 设置ejs模板引擎


// 中间件(所有路径下均按照中间件顺序依次执行)
app.use(logger('dev')); //日志文件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// upload.single的参数和input框中的name保持一致
app.post('/profile', upload.single('file'), function (req, res, next) {
  res.status(200);
  // 因为Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中
  res.json({ msg: '上传成功', data:{path:req.file.path} })
})

app.use('/', usersRouter);
app.use('/', courtRouter);
// // 应用中间件:验证token
// app.use(function(req,res,next){
// 	console.log(req);
// 	next();
// })
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // 传递给下一个中间件
});

// error handler 处理错误请求，参数err做为标识。
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
