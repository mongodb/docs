const result = await plants.insertOne({
  name: "lily of the valley",
  sunlight: "full",
  color: "white",
  type: "perennial",
  _partition: "Store 47",
});
console.log(result);
