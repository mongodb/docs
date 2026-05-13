import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// :replace-start: {
//   "terms": {
//     "// ...": "..."
//   }
// }
// :snippet-start: blog-setter
const blog = new Schema(
  {
    // :remove-start:
    title: String,
    // :remove-end:
    // ...
    slug: {
      type: String,
      required: true,
      minLength: 4,
      lowercase: true,
    },
    // ...
    // :remove-start:
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
    // :remove-end:
  },
  // :remove-start:
  {
    timestamps: true,
  }
  // :remove-end:
);
// :snippet-end:
// :replace-end:

const BlogSetter = model('BlogSetter', blog);
export default BlogSetter;
