// Finds the article by its ID and projects only the title, slug, and content fields.
// Replace <object id> with the objectId of the article.
const articleProject = await Blog.findById(
  '<object id>',
  'title slug content'
).exec();
console.log('Projected Article:', articleProject);
