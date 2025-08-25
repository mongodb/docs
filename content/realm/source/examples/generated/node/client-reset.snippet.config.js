const config = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    clientReset: {
      mode: "manual",
    },
    error: handleSyncError, // callback function defined later
  },
};
