// Define a listener callback function
function onRealmChange() {
  console.log("Something changed!");
}
// Add the listener callback to the realm
try {
  realm.addListener("change", onRealmChange);
} catch (error) {
  console.error(
    `An exception was thrown within the change listener: ${error}`
  );
}
// Remember to remove the listener when you're done!
realm.removeListener("change", onRealmChange);
