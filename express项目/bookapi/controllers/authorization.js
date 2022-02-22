require('dotenv').config()
var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')

//创建token



//验证token
let authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader == null) {
        return res.send({
            'code': '401',
            'msg': 'token不存在'
        })
    }
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.send({
            'code': '403',
            'msg': 'token验证错误'
        })
        req.user = user
        next()
    })
}
module.exports = {
    authenticateToken
}