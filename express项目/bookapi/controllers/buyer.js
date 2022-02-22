var dbConfig = require('../util/dbconfig');
const jwt = require('jsonwebtoken')

//加入购物车
addCart = async(req, res) => {
    const id = req.user.id
    let { picture, name, author, publisher, isbn, date, page, number, price, saler } = req.body
    const SySql1 = `select * from cart where isbn=? and buyer=? and saler=?`
    const SySqlArr1 = [isbn, id, saler]
    let SySql2, SySqlArr2
    let result1 = await dbConfig.SySqlConnect(SySql1, SySqlArr1)
    if (result1.length) {
        SySql2 = `update cart set number=? where isbn=? and buyer=? and saler=?`
        number += result1[0].number
        SySqlArr2 = [number, isbn, id, saler]
    } else {
        SySql2 = `insert into cart(buyer, picture, name, author, publisher, isbn, date, page, number, price, saler)
    values(?,?,?,?,?,?,?,?,?,?,?)`
        SySqlArr2 = [id, picture, name, author, publisher, isbn, date, page, number, price, saler]
    }
    let result2 = await dbConfig.SySqlConnect(SySql2, SySqlArr2)
    console.log(result2.affectedRows)
    if (result2.affectedRows) {
        res.send({
            'code': '200',
            'msg': '加购成功',
            'result': result2
        })
    } else {
        res.send({
            'code': '400',
            'msg': '加购失败',
            'result': result2
        })
    }

}

//获取购物车
getCart = async(req, res) => {
    const id = req.user.id
    console.log(id)
    const SySql = `select * from cart where buyer=?`
    const SySqlArr = [id]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.length) {
        res.send({
            'code': '200',
            'msg': '获取购物车成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '获取购物车失败'
        })
    }
}



//确认订单
buyConfirm = async(req, res) => {
    const id = req.user.id
    let flag = true
    console.log(req.body)
    for (let n of req.body) {
        let { ordernumber, phonenumber, name, picture, author, publisher, isbn, date, page, price, number, saler, address, deal_time, state } = n
        const SySql = `insert into deal(ordernumber, phonenumber, name, picture, author, publisher, isbn, date, page, price, number, buyer, saler, address, deal_time, state) 
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const SySqlArr = [ordernumber, phonenumber, name, picture, author, publisher, isbn, date, page, price, number, id, saler, address, deal_time, state]
        let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
        if (result.affectedRows) {
            flag = true
        } else {
            flag = false
            break
        }
    }
    console.log('flag为' + flag)
    if (flag) {
        res.send({
            'code': '200',
            'msg': '购买成功',
        })
    } else {
        res.send({
            'code': '400',
            'msg': '购买失败',
        })
    }

}


//获取订单
getOrder = async(req, res) => {
    const id = req.user.id
    const SySql = `select * from deal where buyer=?`
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



//确认收货
receive = async(req, res) => {
    const id = req.user.id
    const { ordernumber } = req.body
    const SySql = `update deal set state='已完成' where ordernumber=?`
    const SySqlArr = [ordernumber]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.affectedRows) {
        res.send({
            'code': '200',
            'msg': '成功确认收货',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '失败确认收货',
            'result': result
        })
    }
}


//获取所有卖家信息
getAllSaler = async(req, res) => {
    const id = req.user.id
    const SySql = `select * from saler`
    const SySqlArr = []
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.length) {
        res.send({
            'code': '200',
            'msg': '成功获取卖家信息',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '失败获取卖家信息'
        })
    }

}

//寻找卖家
findSaler = async(req, res) => {
    const buyer = req.user.id
    const { name, author, publisher, number, saler, highprice, lowprice, id } = req.body
    let buyerpicture = '',
        buyername = ''
    const SySql1 = `select * from buyer where id=?`
    const SySqlArr1 = [buyer]
    let result1 = await dbConfig.SySqlConnect(SySql1, SySqlArr1)
    if (result1) {
        buyername = result1[0].name
        buyerpicture = result1[0].picture
    }
    const SySql2 = `insert into findsale(name, author, publisher, number, buyer, saler, highprice, lowprice, buyerpicture, buyername, id)
    values(?,?,?,?,?,?,?,?,?,?,?)`
    const SySqlArr2 = [name, author, publisher, number, buyer, saler, highprice, lowprice, buyerpicture, buyername, id]
    let result2 = await dbConfig.SySqlConnect(SySql2, SySqlArr2)
    if (result2.affectedRows) {
        res.send({
            'code': '200',
            'msg': '申请成功',
            'result': result2
        })
    } else {
        res.send({
            'code': '400',
            'msg': '申请失败',
            'result': result2
        })
    }
}

//得到回复
getReply = async(req, res) => {
    const id = req.user.id
    const SySql = `select * from goods where buyer=?`
    const SySqlArr = [id]
    let result = await dbConfig.SySqlConnect(SySql, SySqlArr)
    if (result.length) {
        res.send({
            'code': '200',
            'msg': '获取成功',
            'result': result
        })
    } else {
        res.send({
            'code': '400',
            'msg': '获取失败',
        })
    }
}

// //删除回复消息以及发布信息
deleteMsg = async(req, res) => {
    const id = req.body.id
    const SySql1 = `delete from goods where id =?`
    const SySqlArr1 = [id]
    let result1 = await dbConfig.SySqlConnect(SySql1, SySqlArr1)
    const SySql2 = `delete from findsale where id =?`
    const SySqlArr2 = [id]
    let result2 = await dbConfig.SySqlConnect(SySql2, SySqlArr2)
    if (result1.affectedRows && result2.affectedRows) {
        res.send({
            'code': '200',
            'msg': '删除成功',
        })
    } else {
        res.send({
            'code': '400',
            'msg': '删除失败',
        })
    }
}


module.exports = {
    addCart,
    getCart,
    buyConfirm,
    getOrder,
    receive,
    getAllSaler,
    findSaler,
    getReply,
    deleteMsg
}