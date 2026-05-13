const blogFind = await Blog.findOne({ author: 'Jess Garcia' });
console.log(blogFind);

const blogWhere = await Blog.findOne().where('author').equals('Jess Garcia');
console.log(blogWhere);
