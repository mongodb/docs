.. code-block:: typescript

   class Book extends Realm.Object<Book> {
     name!: string;
     price?: number;

     static schema: ObjectSchema = {
       name: 'Book',
       properties: {
         name: {type: 'string', indexed: 'full-text'},
         price: 'int?',
       },
     };
   }
