
// Note: In each of the following examples, you can replace the
// Where() method with First(), FirstOrDefault(),
// Single(), SingleOrDefault(),
// Last(), or LastOrDefault().

// Get all items where the Assignee's name starts with "E" or "e"
var ItemssStartWithE = items.Where(i => i.Assignee.StartsWith("E",
    StringComparison.OrdinalIgnoreCase));

// Get all items where the Assignee's name ends wth "is"
// (lower case only)
var endsWith = items.Where(t =>
    t.Assignee.EndsWith("is", StringComparison.Ordinal));

// Get all items where the Assignee's name contains the
// letters "ami" in any casing
var itemsContains = items.Where(i => i.Assignee.Contains("ami",
     StringComparison.OrdinalIgnoreCase));

// Get all items that have no assignee
var null_or_empty = items.Where(i => string.IsNullOrEmpty(i.Assignee));

