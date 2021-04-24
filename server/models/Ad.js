const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 广告位名称
  name: { type: String },
  // 广告位包含的广告
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', schema)