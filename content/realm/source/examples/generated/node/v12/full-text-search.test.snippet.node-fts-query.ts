// Retrieve book objects from realm
const books = realm.objects(Book);

// Filter for books with 'hunger' in the name
const booksWithHunger = books.filtered("name TEXT $0", "hunger");

// Filter for books with 'swan' but not 'lake' in the name
const booksWithSwanWithoutLake = books.filtered("name TEXT $0", "swan -lake");
