// Deletes one article with the slug "awesome-post".
const blogOne = await Blog.deleteOne({ slug: 'awesome-post' });
console.log('Deleted One Blog:', blogOne);
