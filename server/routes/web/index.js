module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  // const Article = require('../../models/Article');
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");
  const Hero = mongoose.model("Hero");
  // 导入新闻数据
  router.get("/news/init", async (req, res) => {
    // lean（）表示取纯粹的json对象和数组
    const parent = await Category.findOne({
      name: "新闻分类",
    });
    const cats = await Category.find()
      .where({
        parent: parent,
      })
      .lean();
    const newsTitles = [
      "测试新闻标题数据1",
      "测试新闻标题数据2",
      "测试新闻标题数据3",
      "测试新闻标题数据4",
      "测试新闻标题数据5",
      "测试新闻标题数据6",
      "测试新闻标题数据7",
      "测试新闻标题数据8",
      "测试新闻标题数据9",
      "测试新闻标题数据10",
      "测试新闻标题数据11",
      "测试新闻标题数据12",
      "测试新闻标题数据13",
      "测试新闻标题数据14",
      "测试新闻标题数据15",
      "测试新闻标题数据16",
      "测试新闻标题数据17",
      "测试新闻标题数据18",
      "测试新闻标题数据19",
      "测试新闻标题数据20",
    ];
    const newsList = newsTitles.map((title) => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        categories: randomCats.slice(0, 2),
        title,
      };
    });
    await Article.deleteMany({});
    await Article.insertMany(newsList);
    res.send(newsList);
  });

  router.get("/news/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类",
    });
    // .populate({
    //   // populate 关联查询children，需要在Category定义虚拟字段children
    //   path: "children",
    //   populate: {
    //     path: "newsList",
    //   },
    // })
    // .lean();

    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          // 关联查询
          from: "articles", // articles由来查阅models/Article.js
          localField: "_id", // 跟虚拟字段定义很像
          foreignField: "categories", // 外键
          as: "newsList", // 别名
        },
      },
      {
        $addFields: {
          // 限制查询5个
          newsList: { $slice: ["$newsList", 5] },
        },
      },
    ]);
    const subCats = cats.map((v) => v._id);
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .populate("categories")
        .where({
          categories: { $in: subCats },
        })
        .limit(5)
        .lean(),
    });
    cats.map((cat) => {
      cat.newsList.map((news) => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });
    res.send(cats);
  });

  // 导入英雄数据
  router.get("/heroes/init", async (req, res) => {
    await Hero.deleteMany({});
    const rawData = require("../../static/heroData")();
    for (let cat of rawData) {
      if (cat.name === "热门") {
        continue;
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name,
      });
      cat.heroes = cat.heroes.map((hero) => {
        hero.categories = [category];
        return hero;
      });
      await Hero.insertMany(cat.heroes);
    }
    res.send(await Hero.find());
  });
  // 获取英雄列表
  router.get("/heroes/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "英雄分类",
    });

    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          // 关联查询
          from: "heroes", // articles由来查阅models/Article.js
          localField: "_id", // 跟虚拟字段定义很像
          foreignField: "categories", // 外键
          as: "heroList", // 别名
        },
      },
    ]);
    const subCats = cats.map((v) => v._id);
    cats.unshift({
      name: "热门",
      heroList: await Hero.find().limit(10).lean(),
    });
    // cats.map((cat) => {
    //   cat.heroList.map((hero) => {
    //     hero.categoryName =
    //       cat.name === "热门" ? hero.categories[0].name : cat.name;
    //     return hero;
    //   });
    //   return cat;
    // });
    res.send(cats);
  });
  // 获取文章详情
  router.get("/articles/:id", async (req, res) => {
    const data = await Article.findById(req.params.id).lean();
    data.related = await Article.find()
      .where({
        categories: { $in: data.categories },
        title: { $ne: data.title },
      })
      .limit(2);
    res.send(data);
  });

  // 获取英雄详情
  router.get("/heroes/:id", async (req, res) => {
    const data = await Hero.findById(req.params.id)
      .populate("categories")
      .lean();

    res.send(data);
  });
  app.use("/web/api", router);
};
