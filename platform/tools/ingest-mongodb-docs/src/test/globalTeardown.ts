import "./globals";
module.exports = async function () {
  try {
    if (global.__MONGO_MEMORY_SERVER_INSTANCE) {
      await global.__MONGO_MEMORY_SERVER_INSTANCE.stop();
    }
    if (global.__MONGO_MEMORY_REPLICA_SET) {
      await global.__MONGO_MEMORY_REPLICA_SET.stop();
    }
  } catch (error) {
    console.error("Error in global teardown:", error);
    throw error;
  }
};
