const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  // 一篇文章可以属于多个分类
  categories: [{
    // 类型必须是id
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'Category'
  }]
})

module.exports = mongoose.model('Article', schema)