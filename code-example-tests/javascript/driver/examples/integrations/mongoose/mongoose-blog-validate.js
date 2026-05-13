import Blog from './model/Blog.js';
import BlogValidated from './model/BlogValidated.js';

export async function insertValidatedBlog() {
  // :snippet-start: validated-insert
  // Creates a new blog post and inserts it into database
  const article = await Blog.create({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    author: 'A.B. Cee',
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
  });
  // :snippet-end:
  return article; // :remove:
}

export async function insertBlogMissingRequiredField() {
  try {
    await BlogValidated.create({
      title: 'Bad Post',
      // missing slug and author — should throw validation error
    });
  } catch (err) {
    return err;
  }
}
