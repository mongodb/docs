const blog = await Blog.exists({ author: 'Jess Garcia' });
console.log(blog);
