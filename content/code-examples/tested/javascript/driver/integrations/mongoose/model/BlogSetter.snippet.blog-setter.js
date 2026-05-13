const blog = new Schema(
  {
    ...
    slug: {
      type: String,
      required: true,
      minLength: 4,
      lowercase: true,
    },
    ...
  },
);
