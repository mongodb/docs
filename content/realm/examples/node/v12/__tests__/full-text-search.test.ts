import Realm, { BSON, ObjectSchema } from "realm";

describe("Full text search query", () => {
  // :snippet-start: node-fts-annotation
  class Book extends Realm.Object<Book> {
    name!: string;
    price?: number;

    static schema: ObjectSchema = {
      name: "Book",
      properties: {
        name: { type: "string", indexed: "full-text" },
        price: "int?",
      },
    };
  }
  // :snippet-end:

  test("FTS query", async () => {
    const realm = await Realm.open({
      schema: [Book],
    });

    // function to create books
    const writeBooks = (bookName: string, bookPrice: number) => {
      realm.write(() => {
        realm.create(Book, {
          name: bookName,
          price: bookPrice,
        });
      });
    };

    // Add books to test
    writeBooks("The Hunger Games", 10);
    writeBooks("Black Swan", 5);
    writeBooks("Swan Lake", 8);

    // :snippet-start: node-fts-query
    // Retrieve book objects from realm
    const books = realm.objects(Book);

    // Filter for books with 'hunger' in the name
    const booksWithHunger = books.filtered("name TEXT $0", "hunger");

    // Filter for books with 'swan' but not 'lake' in the name
    const booksWithSwanWithoutLake = books.filtered("name TEXT $0", "swan -lake");
    // :snippet-end:

    // Tests to make sure filter works
    expect(booksWithHunger.length).toBe(1);
    expect(booksWithSwanWithoutLake.length).toBe(1);
  });
});
