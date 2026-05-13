// Deletes all articles with the slug "awesome-post".
const blogMany = await Blog.deleteMany({ slug: 'awesome-post' });
console.log('Deleted Many Blogs:', blogMany);
