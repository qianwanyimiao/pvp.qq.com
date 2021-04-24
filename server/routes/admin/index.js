module.exports = app => {
  const express = require('express')
  // 用来生成token
  const jwt = require('jsonwebtoken')
  // 用来做断言（判断）的
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })
  // const Category = require('../../models/Category')
  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 获取资源
  router.get('/', async (req, res) => {
    const quertOptions = {}
    if(req.Model.modelName === 'Category') {
      quertOptions.populate= 'parent'
    }
    // populate可以根据对应id把引用的model的对应信息找出来
    const items = await req.Model.find().setOptions(quertOptions).limit(10)
    res.send(items)
  })
  // 获取资源
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 在请求接口之前，判断用户是否授权
  app.use(async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    const { id } = jwt.verify(token, app.get('secret'))
    req.user = await AdminUser.findById(id)
    next()
  })
  // 创建了一个通用CURD接口（rest表示这是一个rest风格的接口）
  // 第一个中间件是用来将resource的小写复数格式转换成大写开头的Model文件格式
  app.use('/admin/api/rest/:resource', (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    // 将model挂载到req上后面的router才能访问到
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  // 上传图片
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/uploads', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
  
  app.post('/admin/api/login', async (req, res) => {
    let {username, password} = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({
      username: username
    }).select('+password')  // 强制取出password
    assert(user, 422, '账号或密码错误')
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '账号或密码错误')
   
    // 3.返回token
    
    // 根据用户id生成token（token密钥从全局获取）
    // 这里的get参数只能有一个，因为和路由的定义是冲突的，所以只能通过
    // 参数来区别
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}

