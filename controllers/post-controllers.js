const { validationResult } = require('express-validator');
const fs = require('fs');

const Post = require('../models/post');
const HttpError = require('../models/http-error');
const {returnQueries } = require('../utils/helpers');

const getPostsByQuery = async (req, res, next) => {
  const queries = returnQueries(req.query);

  let posts;
  try{
    posts = await Post.find(queries);
  }catch( err ){
    const error = HttpError(err, 500);
    return next(error);
  }

  if( !posts || posts.length === 0 ){
    return next(
      new HttpError('Could not find posts', 404)
    );
  };

  res.json( posts.map(post => post.toObject({ getters: true })) );
};

const getPostById = async (req, res, next) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError('Could not find a post for the provided id.', 404);
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return next(
            res
            .status(422)
            .json( {error:errors.array()} )
          );
  }

  const {
        title,
        category,
        author,
        publishedOn,
        thumbImage,
        exclusive,
        breaking,
        video,
        gated,
        body
        } = req.body;
  
  const image = req.file ? req.file.path : '';

  const createdPost = 
    new Post({
        title,
        category,
        author,
        publishedOn,
        thumbImage,
        exclusive,
        breaking,
        video,
        gated,
        body
      });

  let result;
  try{
    result = await createdPost.save();
  }catch(err){
    const error = new HtttpError(err, 500);
    return next(error);
  }

  res.status(201).json(result);
};

const updatePost = async (req, res, next) => {
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

  let post;
  try{
    post = await Post.findById(id);
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(200).json({message:error.message}) );
  }

  if(!post){
    const error = new HttpError('Could not find post', 404);
    return next(error);
  }

  post.title = title;
  post.image = req.file.path;
  post.category = category;
  post.date = date;
  post.summary = summary;
  post.body = body;
  post.author = author;

  try{
    await post.save();
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(200).json({message:error.message}) );
  }

  res.status(200).json({post:post});
};

const deletePost = async (req, res, next) => {
  const id = req.params.id;

  let post;

  try{
    post = await Post.findById(id);
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(error.code).json({message:error.message}) );
  }

  if(!post){
    const error = new HttpError('Could not find an post', 404);
    return next(error);
  }

  try{
    await post.remove();
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(error.code).json({message:error.message}) )
  }

//   fs.unlink(post.image, (err)=> {
//     console.log(err);
//   });

  res.status(200).json({res: post.toObject({getters: true})});
};

exports.getPostsByQuery = getPostsByQuery;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
