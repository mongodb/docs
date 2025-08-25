// Use [c] for case-insensitivity.
console.log(
  "Projects that start with 'e': " +
    projects.filtered("name BEGINSWITH[c] $0", 'e').length
);
console.log(
  "Projects that contain 'ie': " +
    projects.filtered("name CONTAINS $0", 'ie').length
);