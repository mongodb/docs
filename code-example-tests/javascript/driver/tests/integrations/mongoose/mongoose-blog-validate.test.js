import mongoose from 'mongoose';
import Expect from '../../../utils/Expect.js';
import {
  insertValidatedBlog,
  insertBlogMissingRequiredField,
} from '../../../examples/integrations/mongoose/mongoose-blog-validate.js';

describe('Mongoose validated blog schema tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should insert a validated blog post with all required fields', async () => {
    const article = await insertValidatedBlog();
    Expect.that(article.toObject())
      .withIgnoredFields('_id', 'createdAt', 'updatedAt', '__v', 'comments')
      .shouldMatch({
        title: 'Awesome Post!',
        slug: 'awesome-post',
        published: true,
        author: 'A.B. Cee',
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
      });
  });

  it('Should throw a validation error when required fields are missing', async () => {
    const err = await insertBlogMissingRequiredField();
    expect(err).toBeDefined();
    expect(err.name).toBe('ValidationError');
  });
});
