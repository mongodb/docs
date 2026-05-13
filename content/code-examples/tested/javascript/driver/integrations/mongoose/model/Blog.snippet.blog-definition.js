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
