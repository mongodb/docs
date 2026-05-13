// Creates a new blog post and inserts it into database
const article = await Blog.create({
  title: 'Awesome Post!',
  slug: 'awesome-post',
  published: true,
  author: 'A.B. Cee',
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});
