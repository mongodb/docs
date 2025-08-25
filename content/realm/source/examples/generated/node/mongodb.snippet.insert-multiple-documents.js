const result = await plants.insertMany([
  {
    name: "rhubarb",
    sunlight: "full",
    color: "red",
    type: "perennial",
    _partition: "Store 47",
  },
  {
    name: "wisteria lilac",
    sunlight: "partial",
    color: "purple",
    type: "perennial",
    _partition: "Store 42",
  },
  {
    name: "daffodil",
    sunlight: "full",
    color: "yellow",
    type: "perennial",
    _partition: "Store 42",
  },
]);
console.log(result);
