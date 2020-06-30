const getArticlesByQuery = (req, res, next) => {
  const type = req.query.category;

  res.json({message:`pulling article by ${type}`});
};

const getArticleById = (req, res, next) => {
  const id = req.params.id;

  res.json({message: `get article by ${id}`});
};

const createArticle = (req, res, next) => {
  const article = req.body;

  res.json({res:article});
};

const updateArticle = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  res.json({id: `update article by ${id}`,
            body: body,
          });
};

const deleteArticle = (req, res, next) => {
  const id = req.params.id;

  res.json({res: `delete article by ${id}`});
};

exports.getArticlesByQuery = getArticlesByQuery;
exports.getArticleById = getArticleById;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
