var dbConfig = require('../util/dbconfig');
const jwt = require('jsonwebtoken')

//用户登录
userLogin = async(req, res) => {
    const { type, id, password } = req.body
    let SySql = ''
    if (type == 'saler') {
        SySql = `select * from saler where id=? and password=? and user_type=?`
    } else {
        SySql = `select * from buyer where id=? and password=? and user_type=?`
    }
    const user = { id: id }
    let SySqlArr = [id, password, type]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.length) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.send({
            'code': '200',
            'msg': '登录成功',
            accessToken: accessToken,
            user: result[0]
        })
    } else {
        res.send({
            'code': '400',
            'msg': '登录失败'
        })
    }
}

//用户注册
userReg = async(req, res) => {
    const { name, type, id, password } = req.body
    let SySql = ''
    if (type == 'saler') {
        SySql = `insert into saler(name,user_type,id,password)
            values(?,?,?,?)`
    } else {
        SySql = `insert into buyer(name,user_type,id,password)
            values(?,?,?,?)`
    }
    let SySqlArr = [name, type, id, password]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.affectedRows) {
        res.send({
            'code': '200',
            'msg': '注册成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '注册失败',
            'result': result
        })
    }
}


//获取用户信息
getUserInfo = async(req, res) => {
    const id = req.user.id
    let SySql1 = `select * from saler where id=?`
    let SySql2 = `select * from buyer where id=?`
    let SySqlArr = [id]
    let result1 = await dbConfig.SySqlConnect(SySql1, SySqlArr)
    let result2 = await dbConfig.SySqlConnect(SySql2, SySqlArr)
    if (result1 || result2) {
        if (result1.length) {
            res.send({
                'code': '200',
                'msg': '成功获取用户信息',
                'result': result1
            })
        } else {
            res.send({
                'code': '200',
                'msg': '成功获取用户信息',
                'result': result2
            })
        }
    } else {
        res.send({
            'code': '400',
            'msg': '失败获取用户信息',
            'result': result
        })
    }
}

//修改用户信息
updateUserInfo = async(req, res) => {
    const realId = req.user.id
    const { id, name, sex, phonenumber, address, introduce, user_type } = req.body
    let SySql
    if (user_type == 'saler') {
        SySql = `UPDATE saler SET id=?,name=?,sex=?,phonenumber=?,address=?,introduce=? WHERE id=?`
    } else {
        SySql = `UPDATE buyer SET id=?,name=?,sex=?,phonenumber=?,address=?,introduce=? WHERE id=?`
    }
    const SySqlArr = [id, name, sex, phonenumber, address, introduce, realId]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.affectedRows) {
        res.send({
            'code': '200',
            'msg': '修改成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '修改失败',
            'result': result
        })
    }
}

//修改密码
updatePassword = async(req, res) => {
    const id = req.user.id
    const { password, user_type } = req.body
    let SySql
    if (user_type == 'saler') {
        SySql = `UPDATE saler SET password=? WHERE id=?`
    } else {
        SySql = `UPDATE buyer SET password=? WHERE id=?`
    }
    const SySqlArr = [password, id]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.affectedRows) {
        res.send({
            'code': '200',
            'msg': '修改密码成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '修改密码失败',
            'result': result
        })
    }


}

//上传头像
addHead = async(req, res) => {

    //给客户端返回图片的访问地址 域名 + 文件名字 a
    //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹 upload
    const url = 'http://localhost:3000/' + req.file.filename
    const id = req.user.id
    const { type } = req.body
    let SySql = ''
    if (type == 'saler') {
        SySql = `UPDATE saler SET picture=? WHERE  id=? `
    } else {
        SySql = `UPDATE buyer SET picture=? WHERE  id=?`
    }
    let SySqlArr = [url, id]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.affectedRows) {
        res.json({
            url,
            'code': 200,
            'msg': '上传成功'
        })
    } else {
        res.json({
            url,
            'code': 200,
            'msg': '上传失败'
        })
    }
}

//获取所有商品
getGoods = async(req, res) => {
    const id = req.user.id
    let SySql = `select * from goods`
    let SySqlArr = []
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    console.log(result)
    if (result.length) {
        res.send({
            'code': '200',
            'msg': '获取发布商品成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '获取发布商品失败'
        })
    }

}


module.exports = {
    userLogin,
    userReg,
    getUserInfo,
    updateUserInfo,
    addHead,
    getGoods
}