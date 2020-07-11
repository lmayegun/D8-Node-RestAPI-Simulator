const returnQueries = ( queries )=>{
  const { category, search } = queries;

  let query = {};

  if( category !== undefined ){
    query.category = category;
  }

  if( search !== undefined ){
    query.$text = { $search: search };
  }

  return query;
};

exports.returnQueries = returnQueries;
