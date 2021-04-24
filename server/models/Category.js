const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  // 引用自身
  parent: {
    // 类型必须是id
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'Category'
  }
})

module.exports = mongoose.model('Category', schema)