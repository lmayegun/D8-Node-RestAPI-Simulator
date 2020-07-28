const { validationResult } = require('express-validator');
const fs = require('fs');

const Video = require('../models/video');
const HttpError = require('../models/http-error');
const {returnQueries } = require('../utils/helpers');

const getVideosByQuery = async (req, res, next) => {
  const queries = returnQueries(req.query);

  let videos;
  try{
    videos = await Video.find(queries);
  }catch( err ){
    const error = HttpError(err, 500);
    return next(error);
  }

  if( !videos || videos.length === 0 ){
    return next(
      new HttpError('Could not find posts', 404)
    );
  };

  res.json( videos.map(video => video.toObject({ getters: true })) );
};

const getVideoById = async (req, res, next) => {
  const id = req.params.id;

  let video;
  try {
    video = await Video.findById(id);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  if (!video) {
    const error = new HttpError('Could not find a post for the provided id.', 404);
    return next(error);
  }

  res.json({ video: video.toObject({ getters: true }) });
};

const createVideo = async (req, res, next) => {
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
        thumbnail,
        uri,
        description
        } = req.body;

  const createdVideo = 
    new Video({
        title,
        category,
        thumbnail,
        uri,
        description
      });

  let result;
  try{
    result = await createdVideo.save();
  }catch(err){
    const error = new HtttpError(err, 500);
    return next(error);
  }

  res.status(201).json(result);
};

const updateVideo = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return next(
                  res
                  .status(422)
                  .json( {error:errors.array()} )
                );
  }

  const id = req.params.id;
  const {        
        title,
        category,
        thumbnail,
        uri,
        description
        } = req.body;

  let video;
  try{
    video = await Video.findById(id);
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(200).json({message:error.message}) );
  }

  if(!video){
    const error = new HttpError('Could not find post', 404);
    return next(error);
  }

  video.title = title;
  video.category = category;
  video.thumbnail = thumbnail;
  video.uri = uri;
  video.description = description;

  try{
    await video.save();
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(200).json({message:error.message}) );
  }

  res.status(200).json({video:video});
};

const deleteVideo = async (req, res, next) => {
  const id = req.params.id;

  let video;

  try{
    video = await Video.findById(id);
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(error.code).json({message:error.message}) );
  }

  if(!video){
    const error = new HttpError('Could not find an post', 404);
    return next(error);
  }

  try{
    await video.remove();
  }catch(err){
    const error = new HttpError(err, 500);
    return next(res.status(error.code).json({message:error.message}) )
  }

  res.status(200).json({res: video.toObject({getters: true})});
};

exports.getVideosByQuery = getVideosByQuery;
exports.getVideoById = getVideoById;
exports.createVideo = createVideo;
exports.updateVideo = updateVideo;
exports.deleteVideo = deleteVideo;
