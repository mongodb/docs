const config = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser,
    flexible: true,
    clientReset: {
      mode: "manual",
      onManual: (session, path) => {
        // handle manual client reset here
      },
    },
  },
};
