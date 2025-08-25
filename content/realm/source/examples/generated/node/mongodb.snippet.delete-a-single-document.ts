const result = await plants.deleteOne({
  color: "green",
});
console.log(result);
