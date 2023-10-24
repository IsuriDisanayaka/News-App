const express = require('express');
const router = express.Router();
const { Article,articleValidationSchema } = require('../models/Article');


router.post('/article/save', async (req, res) => {
  try {
    const articleCount = await Article.countDocuments();
    const { error } = articleValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newArticle = new Article({
        articleId: articleCount + 1,
      ...req.body
    });
    await newArticle.save();
    return res.status(200).json({
      success: "Article Saved Successfully"
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});
router.get('/article/all', async (req, res) => {
  try {
    const articles = await Article.find();
    return res.status(200).json(articles);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});

router.get('/article/search', async (req, res) => {
  try {
    const searchQuery = {};
    const queryParameters = [
        'articleTitle',
       'articleDescription',
        'articleBody',
        'image',
        'createdDate',
       ' authorName',
    ];
  
    queryParameters.forEach(param => {
      if (req.query[param]) {
        searchQuery[param] = req.query[param];
      }
    });
  
    const articles = await Article.find(searchQuery);
  
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  
});

router.delete('/article/:articleId', async (req, res) => {
  try {
    const deletedArticle = await Article.deleteOne({ articleId: req.params.articleId });
    if (deletedArticle.deletedCount === 0) {
      return res.status(404).json({ error: "Article not found" });
    }
    return res.status(200).json({ success: "Article deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});
router.put('/article/:articleId', async (req, res) => {
  console.log(req)
  try {
    const { error } = articleValidationSchema.validate(req.body);
    console.log("er" + error)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const article= await Article.findOne({articleId: req.params.articleId });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    article.set(req.body);
    await article.save();
    return res.status(200).json({
      success: "Article updated successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});
module.exports = router;