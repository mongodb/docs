const handleSyncError = async (session, error) => {
  // ... handle the error using session and error information.
  console.log(session);
  console.log(error);
};

const config = {
  schema: [DogSchema],
  sync: {
    flexible: true,
    user: app.currentUser,
    onError: handleSyncError,
  },
};

// Open realm with config that contains error handler.
const realm = await Realm.open(config);
