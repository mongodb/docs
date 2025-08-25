import { WaitForSync } from "realm";

// Get tasks that have a status of "in progress".
const completedTasks = realm
  .objects(Task)
  .filtered("status == 'completed'");

// Add subscription with timeout
// If timeout expires before sync is completed, currently-downloaded
// objects are returned and sync download continues in the background.
const taskSubscription = await completedTasks.subscribe({
  behavior: WaitForSync.Always,
  timeout: 500,
});
