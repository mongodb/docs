.. code-block:: typescript

   import {useQuery} from "@realm/react";

   // Retrieve book objects from realm
   const books = useQuery(Book);

   // Filter for books with 'hunger' in the name
   const booksWithHunger = useQuery(Book, books => {
     return books.filtered('name TEXT $0', 'hunger');
   });

   // Filter for books with 'swan' but not 'lake' in the name
   const booksWithSwanWithoutLake = useQuery(Book, books => {
     return books.filtered('name TEXT $0', 'swan -lake');
   });
