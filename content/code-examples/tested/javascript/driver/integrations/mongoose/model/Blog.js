import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

const Blog = model('Blog', blog);
export default Blog;
