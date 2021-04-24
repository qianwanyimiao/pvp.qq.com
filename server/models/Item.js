const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  // 图片地址
  icon: {
    type: String, 
  }
})

module.exports = mongoose.model('Item', schema)