const result = await plants.deleteMany({
  _partition: "Store 42",
});
console.log(result);
