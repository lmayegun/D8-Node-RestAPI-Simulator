const getArticlesByQuery = (req, res, next) => {
  const type = req.query.category;

  res.json({message:`pulling article by ${type}`});
};

exports.getArticlesByQuery = getArticlesByQuery;
