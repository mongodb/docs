// Query a book and its author
var book = db.Books.FirstOrDefault(b => b.Title == "My Book");
var author = db.Authors.FirstOrDefault(a => a.Id == book!.AuthorId);
