const getArticlesByQuery = (req, res, next) => {
  const type = req.query.category;

  res.json({message:`pulling article by ${type}`});
};

const getArticleById = (req, res, next) => {
  const id = req.params.id;

  res.json({message: `get article by ${id}`});
}

const createArticle = (req, res, next) => {
  const article = req.body;

  res.json({res:article});
}

exports.getArticlesByQuery = getArticlesByQuery;
exports.getArticleById = getArticleById;
exports.createArticle = createArticle;
