const { validationResult } = require('express-validator');
const fs = require('fs');

const Article = require('../models/article');
const HttpError = require('../models/http-error');
const {returnQueries } = require('../utils/helpers');

const getArticlesByQuery = async (req, res, next) => {
  const queries = returnQueries(req.query);
  const sortBy = req.query.sortBy ? req.query.sortBy : 'body';
  const limit = req.query.limit ? parseInt(req.query.limit) : 2; 
  const skip = req.query.skip ? parseInt(req.query.skip) : 0; 

  let articles;
  try{
    articles = await Article.find(queries)
                            .sort(sortBy)
                            .limit(limit)
                            .skip(skip);
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

  const {title,
         category, 
         author, 
         publishedOn, 
         summary, 
         body, 
         tags, 
         content,
         urlToImage,
         sideThumbImg,
         centerThumbImg, 
         description} = req.body;
  
  const image = req.file ? req.file.path : '';

  const createdArticle = 
    new Article({
        title,
        category,
        author,
        publishedOn,
        image,
        urlToImage,
        sideThumbImg,
        centerThumbImg, 
        summary,
        body,
        content,
        description,
        tags
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

const updateArticle = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return next(
                  res
                  .status(422)
                  .json( {error:errors.array()} )
                );
  }

  const id = req.params.id;
  const {title, category, author, publishedOn, image, summary, body, tags, content, description} = req.body;

  let article;
  try{
    article = await Article.findById(id);
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(200).json({message:error.message}) );
  }

  if(!article){
    const error = new HttpError('Could not find article', 404);
    return next(error);
  }

  article.title = title;
  article.image = req.file.path;
  article.category = category;
  article.date = date;
  article.summary = summary;
  article.body = body;
  article.author = author;

  try{
    await article.save();
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(200).json({message:error.message}) );
  }

  res.status(200).json({article:article});
};

const deleteArticle = async (req, res, next) => {
  const id = req.params.id;

  let article;

  try{
    article = await Article.findById(id);
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(error.code).json({message:error.message}) );
  }

  if(!article){
    const error = new HttpError('Could not find an article', 404);
    return next(error);
  }

  try{
    await article.remove();
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(error.code).json({message:error.message}) )
  }

  fs.unlink(article.image, (err)=> {
    console.log(err);
  });

  res.status(200).json({res: article.toObject({getters: true})});
};

exports.getArticlesByQuery = getArticlesByQuery;
exports.getArticleById = getArticleById;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
