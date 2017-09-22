const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const app = new Koa();
const User = require('./db.js');

app.use(bodyParser());

let home = new Router();

home.get('/', async (ctx) => {
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

home.post('/', async (ctx) => {
    console.log(ctx.request.body);
    let ret = await User.create(ctx.request.body)

    let data = await User.findOne({
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
        }
    }
})

app.use(home.routes()).use(home.allowedMethods());


app.listen(3333, () => {
    console.log('server start at http://localhost:3333');
})
