db.runCommand({
   update: "movies",
   updates: [
      { q: { title: "The Great Train Robbery" }, u: { $inc: { "num_mflix_comments": 1 } }, hint: { year: 1 }, multi: false }
   ]
})