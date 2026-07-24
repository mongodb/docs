const pipeline = [{ $replaceWith: '$imdb' }];

const cursor = collection.aggregate(pipeline);
return cursor;
