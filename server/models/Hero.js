const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // 图片地址
  avatar: { type: String },
  // 称号
  title: { type: String },
  // 英雄分类（有些英雄不止一个分类，所以需要数组来存）
  categories: [{
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'Category' 
  }],
  // 评分
  scores: {
    difficulty: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  // 技能 
  skills: [{
    icon: { type: String },
    name: { type: String },
    cost: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 顺风出装
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  // 逆风出装
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  // 最佳搭档
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)