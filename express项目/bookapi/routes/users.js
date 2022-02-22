require('dotenv').config()
var dbConfig = require('../util/dbconfig');
var express = require('express');
var router = express.Router();
var head = require('../picture/headStorage')
var goods = require('../picture/goodStorage')
var deal = require('../picture/dealStorage')
var user = require('../controllers/user')
var saler = require('../controllers/saler')
var buyer = require('../controllers/buyer')
var authorization = require('../controllers/authorization')
    // const multer = require('multer')
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



//上传头像
router.post('/headUpload', authorization.authenticateToken, head.headUpload.single('file'), user.addHead)


//上传商品图片
router.post('/goodUpload', authorization.authenticateToken, goods.goodUpload.single('file'), (req, res) => {

    //给客户端返回图片的访问地址 域名 + 文件名字 a
    //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹 upload
    const url = 'http://localhost:3000/' + req.file.filename
    res.json({ url })
})

//上传已成交商品图片
router.post('/dealUpload', authorization.authenticateToken, deal.dealUpload.single('file'), (req, res) => {

    //给客户端返回图片的访问地址 域名 + 文件名字 a
    //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹 upload
    const url = 'http://localhost:3000/' + req.file.filename
    res.json({ url })
})

//用户路由
router.post('/userLogin', user.userLogin)
router.post('/userReg', user.userReg)
router.post('/getUserInfo', authorization.authenticateToken, user.getUserInfo)
router.post('/updateUserInfo', authorization.authenticateToken, user.updateUserInfo)
router.post('/getGoods', authorization.authenticateToken, user.getGoods)


//卖家路由
router.post('/getSale', authorization.authenticateToken, saler.getSale)
router.post('/addGoods', authorization.authenticateToken, saler.addGoods)
router.post('/updateGoods', authorization.authenticateToken, saler.updateGoods)
router.post('/getSalerOrder', authorization.authenticateToken, saler.getSalerOrder)
router.post('/getFind', authorization.authenticateToken, saler.getFind)
router.post('/delivery', authorization.authenticateToken, saler.delivery)


//卖家路由
router.post('/addCart', authorization.authenticateToken, buyer.addCart)
router.post('/getCart', authorization.authenticateToken, buyer.getCart)
router.post('/buyConfirm', authorization.authenticateToken, buyer.buyConfirm)
router.post('/getOrder', authorization.authenticateToken, buyer.getOrder)
router.post('/getAllSaler', authorization.authenticateToken, buyer.getAllSaler)
router.post('/findSaler', authorization.authenticateToken, buyer.findSaler)
router.post('/getReply', authorization.authenticateToken, buyer.getReply)
router.post('/deleteMsg', authorization.authenticateToken, buyer.deleteMsg)
router.post('/receive', authorization.authenticateToken, buyer.receive)
module.exports = router;