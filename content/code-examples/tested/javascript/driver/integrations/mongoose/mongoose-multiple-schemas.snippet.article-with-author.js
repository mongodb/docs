// Creates a new blog post that references the user as the author
const articleAuthor = await Blog.create({
  title: 'Awesome Post!',
  slug: 'awesome-post',
  author: user._id,
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});
console.log('Article with Author:', articleAuthor);
