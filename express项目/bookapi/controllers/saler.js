var dbConfig = require('../util/dbconfig');


getSale = async(req, res) => {
    const id = req.user.id
    console.log(id)
    let SySql = `select * from goods where saler = ?`
    let SySqlArr = [id]
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

//发布商品
addGoods = async(req, res) => {
    const id = req.user.id
    let SySql1 = `select * from saler where id=?`
    let SySqlArr1 = [id]
    let result1 = await dbConfig.SySqlConnect(SySql1, SySqlArr1)
    let headpicture, salername
    if (result1) {
        headpicture = result1[0].picture
        salername = result1[0].name
    }
    const { picture, name, category, author, publisher, isbn, date, page, number, price } = req.body
    let buyer = ""
    let id2 = ""
    if (req.body.buyer) {
        buyer = req.body.buyer
    }
    if (req.body.id) {
        id2 = req.body.id
    }

    const SySql = `insert into goods(saler, picture, name, category, author, publisher, isbn, date, page, number, price, headpicture, salername, buyer, id)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const SySqlArr = [id, picture, name, category, author, publisher, isbn, date, page, number, price, headpicture, salername, buyer, id2]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    console.log(result.affectedRows)
    if (result.affectedRows) {
        res.send({
            'code': '200',
            'msg': '发布成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '发布失败',
            'result': result
        })
    }
}

//修改商品
updateGoods = async(req, res) => {
    const id = req.user.id
    console.log(id)
    const { picture, name, number, price } = req.body
    const SySql = `UPDATE goods SET picture=?,number=?,price=? WHERE saler=? and name=?`
    const SySqlArr = [picture, number, price, id, name]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    console.log(result.affectedRows)
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


//获取订单
getSalerOrder = async(req, res) => {
    const id = req.user.id
    const SySql = `select * from deal where saler=?`
    const SySqlArr = [id]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.length) {
        res.send({
            'code': '200',
            'msg': '成功获取订单',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '失败获取订单'
        })
    }
}

//获取申请
getFind = async(req, res) => {
    const id = req.user.id
    const SySql = `select * from findsale where saler=?`
    const SySqlArr1 = [id]
    const SySqlArr2 = ['all']
    let result1 = await dbConfig.SySqlConnect(SySql, SySqlArr1)
    let result2 = await dbConfig.SySqlConnect(SySql, SySqlArr2)
    if (result1.length || result2.length) {
        res.send({
            'code': '200',
            'msg': '成功获取申请',
            'result1': result1,
            'result2': result2
        })
    } else {
        res.send({
            'code': '400',
            'msg': '失败获取申请',
        })
    }

}

//发货
delivery = async(req, res) => {
    const id = req.user.id
    const ordernumber = req.body.ordernumber
    const SySql = `update deal set state='待收货' where ordernumber=?`
    const SySqlArr = [ordernumber]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.affectedRows) {
        res.send({
            'code': '200',
            'msg': '发货成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '发货失败',
            'result': result
        })
    }
}
module.exports = {
    getSale,
    addGoods,
    updateGoods,
    getSalerOrder,
    getFind,
    delivery
}