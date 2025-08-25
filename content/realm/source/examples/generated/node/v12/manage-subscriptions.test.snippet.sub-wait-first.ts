import { WaitForSync } from "realm";

// Get tasks that have a status of "in progress".
const completedTasks = realm
  .objects(Task)
  .filtered("status == 'completed'");

// Only waits for sync to finish on the initial sync.
await completedTasks.subscribe({
  behavior: WaitForSync.FirstTime,
  name: "First time sync only",
});
