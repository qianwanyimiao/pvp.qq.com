const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors()) // 解决跨域问题
app.use(express.json()) // 解析请求里的body里的数据
app.use('/uploads', express.static(__dirname + '/uploads'))


require('./plugins/db')(app)  // 立即执行，并且可以传app进去
require('./routes/admin')(app)

// 设置密钥（token密钥）到app实例
// 这个密钥其实应该放到环境变量里，这里为了方便
app.set('secret', 'dsfadfwefag45gk5')

app.listen(3000, () => {
  console.log('aaa');
})