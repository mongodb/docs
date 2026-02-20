import mongoose from 'mongoose';
import Blog from './model/Blog.js';
// start-user-import
import User from './model/User.js';
// end-user-import

mongoose.connect("<connection string>");

// start-create-user
// Create a new user
const user = await User.create({
  name: 'Jess Garica',
  email: 'jgarcia@email.com',
});
// end-create-user

// start-article-with-author
// Creates a new blog post that references the user as the author
const articleAuthor = await Blog.create({
  title: 'Awesome Post!',
  slug: 'Awesome-Post',
  author: user._id,
  content: 'This is the best post ever',
  tags: ['featured', 'announcement'],
});

console.log('Article with Author:', articleAuthor);
// end-article-with-author

// start-populate-author
// Populates the author field with user data
const articlePopulate = await Blog.findOne({ title: "Awesome Post!" }).populate("author");
console.log('Article Populated:', articlePopulate);
// end-populate-author

// start-middleware-update
// Uses middleware to update the updated field before saving and updating

// Create a new article
const articleMiddlewareUpdate = await Blog.create({
  title: 'Another Awesome Post!',
  slug: 'Another-Awesome-Post',
  author: user._id,
  content: 'Here is another awesome post',
});
console.log('Original Article: ', articleMiddlewareUpdate);
// Wait
await new Promise(resolve => setTimeout(resolve, 1000));
// Update the article
articleMiddlewareUpdate.content = "Check my updated field"
await articleMiddlewareUpdate.save();
console.log('Auto-updated Article:', articleMiddlewareUpdate);
// end-middleware-update