const result = await plants.deleteMany({
  _partition: "Store 51",
});
console.log(result);
