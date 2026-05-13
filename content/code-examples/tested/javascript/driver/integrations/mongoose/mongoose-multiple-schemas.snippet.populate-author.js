// Populates the author field with user data
const articlePopulate = await Blog.findOne({
  title: 'Awesome Post!',
}).populate('author');
console.log('Article Populated:', articlePopulate);
