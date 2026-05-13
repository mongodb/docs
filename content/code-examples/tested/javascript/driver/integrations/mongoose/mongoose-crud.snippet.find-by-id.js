// Finds the article by its ID. Replace <object id> with the objectId of the article.
const articleFound = await Blog.findById('<object id>').exec();
console.log('Found Article by ID:', articleFound);
