import mysql from 'mysql2/promise';


let mysqlConnection : mysql.Connection;
async function startMysql () {
    mysqlConnection = await mysql.createConnection({
        host: 'localhost',
        user: 'fahmy',
        password: 'test1234',
        database: 'purchaseo',
    });
};

export{startMysql, mysqlConnection}

