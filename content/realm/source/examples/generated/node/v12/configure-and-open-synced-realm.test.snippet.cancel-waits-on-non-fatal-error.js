const config = {
  schema: [Doggie],
  sync: {
    flexible: true,
    user: app.currentUser,
    // When `true`, upload and download waits are canceled on any
    // error, such as a timeout, instead of just a fatal error.
    // You can provide an optional timeouts property in milliseconds.
    cancelWaitsOnNonFatalError: true,
  },
};
