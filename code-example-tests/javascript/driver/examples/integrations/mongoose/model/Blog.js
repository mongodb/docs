import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// :snippet-start: blog-definition
const blog = new Schema(
  {
    title: String,
    slug: String,
    published: Boolean,
    author: String,
    content: String,
    tags: [String],
    comments: [
      {
        user: String,
        content: String,
        votes: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
// :snippet-end:

// :snippet-start: model-declaration
const Blog = mongoose.model('Blog', blog);
// :snippet-end:
export default Blog;
