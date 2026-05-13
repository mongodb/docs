import mongoose from 'mongoose';
import Expect from '../../../utils/Expect.js';
import BlogSetter from '../../../examples/integrations/mongoose/model/BlogSetter.js';

describe('Mongoose blog setter tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should lowercase the slug field on insert', async () => {
    const article = await BlogSetter.create({ slug: 'Awesome-Post' });
    Expect.that(article.toObject())
      .shouldResemble(article.toObject())
      .withSchema({
        count: 1,
        requiredFields: ['slug'],
        fieldValues: { slug: 'awesome-post' },
      });
  });
});
