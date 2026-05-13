const blog = await Blog.findOne()
  .where('author')
  .equals('Jess Garcia')
  .select('title author');
console.log(blog);
