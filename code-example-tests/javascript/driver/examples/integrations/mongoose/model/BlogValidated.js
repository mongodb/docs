import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// :snippet-start: blog-validate
const blog = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      minLength: 4,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: true,
    },
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

const BlogValidated = model('BlogValidated', blog);
export default BlogValidated;
