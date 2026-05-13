// :replace-start: {
//    "terms": {
//       "userId": "user._id"
//    }
// }
import mongoose from 'mongoose';
// :snippet-start: user-import
import User from './model/User.js';
// :snippet-end:
const { Schema, SchemaTypes, model } = mongoose;

// Local blog schema with User ObjectId reference
const blogRefSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, minLength: 4 },
    published: { type: Boolean, default: false },
    author: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    content: String,
    tags: [String],
  },
  { timestamps: true }
);

const Blog = mongoose.models.BlogRef || model('BlogRef', blogRefSchema);

export async function createUser() {
  // :snippet-start: create-user
  // Creates a new user
  const user = await User.create({
    name: 'Jess Garcia',
    email: 'jgarcia@email.com',
  });
  // :snippet-end:
  return user; // :remove:
}

export async function createArticleWithAuthor(userId) {
  // :snippet-start: article-with-author
  // Creates a new blog post that references the user as the author
  const articleAuthor = await Blog.create({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    author: userId,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
  });
  console.log('Article with Author:', articleAuthor);
  // :snippet-end:
  return articleAuthor; // :remove:
}

export async function populateAuthor() {
  // :snippet-start: populate-author
  // Populates the author field with user data
  const articlePopulate = await Blog.findOne({
    title: 'Awesome Post!',
  }).populate('author');
  console.log('Article Populated:', articlePopulate);
  // :snippet-end:
  return articlePopulate; // :remove:
}
// :replace-end:
