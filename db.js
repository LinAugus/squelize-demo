const Sequelize = require('sequelize');


// 连接数据库
const db = new Sequelize(
    'demo',
    'dev',
    'dev',
    {
        dialet: 'mysql',
        host: 'localhost',
        pool: {
            max: 5,
            min: 0,
            idle: 1000
        }
    }
);

var User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        field: 'username'
    },
    nickname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

console.log(db.models);

module.exports = User;

User.sync({ force: true }).then(() => {
    return User.create({
        username: 'Jon',
        nickname: 'lin',
        email: 'aa'
    });
});
