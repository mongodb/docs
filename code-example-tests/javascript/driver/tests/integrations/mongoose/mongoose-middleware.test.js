import mongoose from 'mongoose';
import {
  createUserWithInvalidEmail,
  createUserWithValidEmail,
} from '../../../examples/integrations/mongoose/mongoose-middleware.js';

describe('Mongoose middleware tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should throw an error when email format is invalid', async () => {
    await expect(createUserWithInvalidEmail()).rejects.toThrow(
      'Invalid email format'
    );
  });

  it('Should create a user when email format is valid', async () => {
    const user = await createUserWithValidEmail();
    expect(user.email).toBe('jgarcia@email.com');
  });
});
