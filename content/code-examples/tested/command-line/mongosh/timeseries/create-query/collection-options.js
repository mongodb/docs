db.runCommand({
   listCollections: 1,
   filter: { name: "weather" }
})