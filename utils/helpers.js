const returnQueries = ( queries )=>{
  const { category, search, tag } = queries;

  let query = {};

  if( category !== undefined ){
    query.category = category;
  }

  if( search !== undefined ){
    query.$text = { $search: search };
  }

  if( tag !== undefined ){
    query.tags = tag
  }

  return query;
};

exports.returnQueries = returnQueries;
