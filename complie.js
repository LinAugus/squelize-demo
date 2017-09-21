'use strict';

require('babel-register');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const app = new Koa();
const User = require('./db.js');

app.use(bodyParser());

let home = new Router();

home.get('/', (() => {
    var _ref = _asyncToGenerator(function* (ctx) {
        ctx.body = `
    <form method="POST" action="/">
        <p>userName</p>
        <input name="username" /><br/>
        <p>nickName</p>
        <input name="nickname" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
    </form>`;
    });

    return function (_x) {
        return _ref.apply(this, arguments);
    };
})());

home.post('/', (() => {
    var _ref2 = _asyncToGenerator(function* (ctx) {
        console.log(ctx.request.body);
        let ret = yield User.create(ctx.request.body);

        let data = yield User.findOne({
            where: {
                username: ctx.request.body.username
            }
        });
        if (data.id) {
            ctx.body = data;
        } else {
            ctx.body = {
                retCode: '02323',
                retMsg: '添加失败'
            };
        }
    });

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
})());

app.use(home.routes()).use(home.allowedMethods());

app.listen(3333, () => {
    console.log('server start at http://localhost:3333');
});
