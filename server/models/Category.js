const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  // 引用自身
  parent: {
    // 类型必须是id
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});
// 定义虚拟字段
schema.virtual("children", {
  ref: "Category", // 关联的模型
  foreignField: "parent", // 外键，关联模型的哪个字段
  localField: "_id", // 內键，schema对应的模型Category的_id
  justOne: false, // 是否只查询一条数据
});

schema.virtual("newsList", {
  ref: "Article", // 关联的模型
  foreignField: "categories", // 外键，关联模型的哪个字段
  localField: "_id", // 內键，schema对应的模型Category的_id
  justOne: false, // 是否只查询一条数据
});

module.exports = mongoose.model("Category", schema);
