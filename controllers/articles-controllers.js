const { validationResult } = require('express-validator');

const Article = require('../models/article');
const HttpError = require('../models/http-error');

const getArticlesByQuery = async (req, res, next) => {
  const { category } = req.query;

  let articles;
  try{
    articles = await Article.find({ category: category });
  }catch( err ){
    const error = HttpError(err, 500);
    return next(error);
  }

  if( !articles || articles.length === 0 ){
    return next(
      new HttpError('Could not find articles', 404)
    );
  };

  res.json( articles.map(article => article.toObject({ getters: true })) );
};

const getArticleById = async (req, res, next) => {
  const id = req.params.id;

  let article;
  try {
    article = await Article.findById(id);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  if (!article) {
    const error = new HttpError('Could not find a article for the provided id.', 404);
    return next(error);
  }

  res.json({ article: article.toObject({ getters: true }) });
};

const createArticle = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return next(
                  res
                  .status(422)
                  .json( {error:errors.array()} )
                );
  }

  const {title, category, author, publishedOn, image, summary, body} = req.body;

  const createdArticle = new Article({
                              title,
                              category,
                              author,
                              publishedOn,
                              image: 'req.file.path',
                              summary,
                              body
                            });

  let result;
  try{
    result = await createdArticle.save();
  }catch(err){
    const error = new HtttpError(err, 500);
    return next(error);
  }

  res.status(201).json(result);
};

const updateArticle = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  res.json({id: `update article by ${id}`,
            body: body,
          });
};

const deleteArticle = async (req, res, next) => {
  const id = req.params.id;

  let article;

  try{
    article = await Article.findById(id);
    await article.remove();
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(200).json({message:error.message}) );
  }

  res.status(200).json({res: article});
};

exports.getArticlesByQuery = getArticlesByQuery;
exports.getArticleById = getArticleById;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
