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
