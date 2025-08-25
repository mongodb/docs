function createEnum(arr) {
  arr.forEach((p, i) => arr[p] = i);
  return arr;
}
// Priority.High === 1
// Priority[Priority.High] === "High"
export const Priority = createEnum([
  "Severe",
  "High",
  "Medium",
  "Low",
])
