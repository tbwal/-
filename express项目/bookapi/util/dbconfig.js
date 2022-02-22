const mysql = require('mysql');
//数据库配置
module.exports = {
    config: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'oldbook',
    },
    //连接数据库，使用mysql的连接池连接方式
    //连接池对象
    sqlConnect: function(sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config)
        pool.getConnection((err, conn) => {
            console.log('12345')
            if (err) {
                console.log('连接失败');
                return;
            }
            //事件驱动回调
            conn.query(sql, sqlArr, callBack);
            //释放连接
            conn.release();
        })

    },
    SySqlConnect: function(SySql, SySqlArr) {
        return new Promise((resolve, reject) => {
            var pool = mysql.createPool(this.config)
            pool.getConnection((err, conn) => {
                console.log('连接数据库中...')
                if (err) {
                    console.log('连接数据库失败')
                    reject(err)
                } else {
                    //事件驱动回调
                    conn.query(SySql, SySqlArr, (err, data) => {
                            if (err) {
                                reject(err)
                            } else {
                                console.log('连接数据库成功')
                                resolve(data)
                                pool.end()
                            }
                        })
                        //释放连接
                        // pool.releaseConnection(conn)
                }

            })
        }).catch((err) => {
            console.log(err)
        })
    }
}