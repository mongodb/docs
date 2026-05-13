// :replace-start: {
//    "terms": {
//       "findById(id": "findById('<object id>'"
//    }
// }
import mongoose from 'mongoose';
// :snippet-start: blog-import
import Blog from './model/Blog.js';
// :snippet-end:

export async function insertBlog() {
  // :snippet-start: insert
  // Creates a new blog post and inserts it into the database
  const article = await Blog.create({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
  });
  console.log('Created article:', article);
  // :snippet-end:
  return article; // :remove:
}

export async function updateBlog(article) {
  // :snippet-start: update
  // Updates the title of the article
  article.title = 'The Most Awesomest Post!!';
  await article.save();
  console.log('Updated Article:', article);
  // :snippet-end:
  return article; // :remove:
}

export async function findBlogById(id) {
  // :snippet-start: find-by-id
  // Finds the article by its ID. Replace <object id> with the objectId of the article.
  const articleFound = await Blog.findById(id).exec();
  console.log('Found Article by ID:', articleFound);
  // :snippet-end:
  return articleFound; // :remove:
}

export async function projectBlogFields(id) {
  // :snippet-start: project-fields
  // Finds the article by its ID and projects only the title, slug, and content fields.
  // Replace <object id> with the objectId of the article.
  const articleProject = await Blog.findById(id, 'title slug content').exec();
  console.log('Projected Article:', articleProject);
  // :snippet-end:
  return articleProject; // :remove:
}

export async function deleteOneBlog() {
  // :snippet-start: delete-one
  // Deletes one article with the slug "awesome-post".
  const blogOne = await Blog.deleteOne({ slug: 'awesome-post' });
  console.log('Deleted One Blog:', blogOne);
  // :snippet-end:
  return blogOne; // :remove:
}

export async function deleteManyBlogs() {
  // :snippet-start: delete-many
  // Deletes all articles with the slug "awesome-post".
  const blogMany = await Blog.deleteMany({ slug: 'awesome-post' });
  console.log('Deleted Many Blogs:', blogMany);
  // :snippet-end:
  return blogMany; // :remove:
}

export async function blogExists() {
  // :snippet-start: exists
  const blog = await Blog.exists({ author: 'Jess Garcia' });
  console.log(blog);
  // :snippet-end:
  return blog; // :remove:
}

export async function findBlogByAuthor() {
  // :snippet-start: find-where
  const blogFind = await Blog.findOne({ author: 'Jess Garcia' });
  console.log(blogFind);

  const blogWhere = await Blog.findOne().where('author').equals('Jess Garcia');
  console.log(blogWhere);
  // :snippet-end:
  return { blogFind, blogWhere }; // :remove:
}

export async function findBlogWithSelect() {
  // :snippet-start: find-where-select
  const blog = await Blog.findOne()
    .where('author')
    .equals('Jess Garcia')
    .select('title author');
  console.log(blog);
  // :snippet-end:
  return blog; // :remove:
}
// :replace-end:
