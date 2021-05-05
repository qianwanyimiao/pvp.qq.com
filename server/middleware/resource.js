module.exports = options => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    // 将model挂载到req上后面的router才能访问到
    req.Model = require(`../models/${modelName}`)
    next()
  }
}