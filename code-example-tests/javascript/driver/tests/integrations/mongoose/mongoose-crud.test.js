import mongoose from 'mongoose';
import Expect from '../../../utils/Expect.js';
import Blog from '../../../examples/integrations/mongoose/model/Blog.js';
import {
  insertBlog,
  updateBlog,
  findBlogById,
  projectBlogFields,
  deleteOneBlog,
  deleteManyBlogs,
  blogExists,
  findBlogByAuthor,
  findBlogWithSelect,
} from '../../../examples/integrations/mongoose/mongoose-crud.js';

describe('Mongoose CRUD operation tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should insert a blog post and return a document with the expected fields', async () => {
    const article = await insertBlog();
    Expect.that(article.toObject())
      .withIgnoredFields('_id', 'createdAt', 'updatedAt', '__v', 'comments')
      .shouldMatch({
        title: 'Awesome Post!',
        slug: 'awesome-post',
        published: true,
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
      });
  });

  it('Should update a blog post title', async () => {
    const article = await insertBlog();
    const updated = await updateBlog(article);
    Expect.that(updated.toJSON())
      .withIgnoredFields('_id', 'createdAt', 'updatedAt', '__v', 'comments')
      .shouldMatch({
        title: 'The Most Awesomest Post!!',
        slug: 'awesome-post',
        published: true,
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
      });
  });

  it('Should find a blog post by ID', async () => {
    const article = await insertBlog();
    const found = await findBlogById(article._id);
    Expect.that(found.toJSON())
      .withIgnoredFields('_id', 'createdAt', 'updatedAt', '__v', 'comments')
      .shouldMatch({
        title: 'Awesome Post!',
        slug: 'awesome-post',
        published: true,
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
      });
  });

  it('Should return only projected fields', async () => {
    const article = await insertBlog();
    const projected = await projectBlogFields(article._id);
    expect(projected.title).toBeDefined();
    expect(projected.slug).toBeDefined();
    expect(projected.content).toBeDefined();
    expect(projected.tags).toBeUndefined();
  });

  it('Should delete one blog post', async () => {
    await insertBlog();
    const result = await deleteOneBlog();
    expect(result.deletedCount).toBe(1);
  });

  it('Should delete many blog posts', async () => {
    await insertBlog();
    await insertBlog();
    const result = await deleteManyBlogs();
    expect(result.deletedCount).toBeGreaterThanOrEqual(1);
  });

  it('Should return the _id of a blog post that matches the exists() query', async () => {
    await Blog.create({
      title: 'Awesome Post!',
      slug: 'awesome-post',
      author: 'Jess Garcia',
    });
    const result = await blogExists();
    expect(result).not.toBeNull();
    expect(result._id).toBeDefined();
  });

  it('Should return matching documents using both findOne() and where() methods', async () => {
    await Blog.create({
      title: 'Awesome Post!',
      slug: 'awesome-post',
      author: 'Jess Garcia',
    });
    const { blogFind, blogWhere } = await findBlogByAuthor();
    expect(blogFind._id.toString()).toBe(blogWhere._id.toString());
    expect(blogFind.author).toBe('Jess Garcia');
  });

  it('Should return only selected fields when using where() and select()', async () => {
    await Blog.create({
      title: 'Awesome Post!',
      slug: 'awesome-post',
      author: 'Jess Garcia',
    });
    const result = await findBlogWithSelect();
    expect(result.title).toBeDefined();
    expect(result.author).toBeDefined();
    expect(result.slug).toBeUndefined();
  });
});
