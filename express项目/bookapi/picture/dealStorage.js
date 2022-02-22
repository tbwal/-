const multer = require('multer')
    //上传已成交商品图片
const dealStorage = multer.diskStorage({
    //存储的位置
    destination(req, file, cb) {
        cb(null, 'upload/deal/')
    },
    //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
    filename(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

//传入storage 除了这个参数我们还可以传入dest等参数
const dealUpload = multer({ 'storage': dealStorage })

module.exports = {
    dealUpload
}