import mongoose from 'mongoose';
import Expect from '../../../utils/Expect.js';
import {
  createUser,
  createArticleWithAuthor,
  populateAuthor,
} from '../../../examples/integrations/mongoose/mongoose-multiple-schemas.js';

describe('Mongoose multiple schemas tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should create a user', async () => {
    const user = await createUser();
    Expect.that(user.toObject())
      .withIgnoredFields('_id', 'createdAt', 'updatedAt', '__v')
      .shouldMatch({ name: 'Jess Garcia', email: 'jgarcia@email.com' });
  });

  it('Should create a blog post with a user as author', async () => {
    const user = await createUser();
    const article = await createArticleWithAuthor(user._id);
    Expect.that(article.toJSON())
      .withIgnoredFields('_id', 'author', 'createdAt', 'updatedAt', '__v')
      .shouldMatch({
        title: 'Awesome Post!',
        slug: 'awesome-post',
        published: false,
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
      });
  });

  it('Should populate the author field with user data', async () => {
    const user = await createUser();
    await createArticleWithAuthor(user._id);
    const populated = await populateAuthor();
    Expect.that(populated.toJSON())
      .withIgnoredFields('_id', 'createdAt', 'updatedAt', '__v')
      .shouldMatch({
        title: 'Awesome Post!',
        slug: 'awesome-post',
        published: false,
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
        author: {
          _id: '...',
          name: 'Jess Garcia',
          email: 'jgarcia@email.com',
          __v: 0,
        },
      });
  });
});
