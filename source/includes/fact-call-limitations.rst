.. Top level title in calling page, won't render in right TOC

The results of database queries cannot be passed inside the following
contexts:

- Class constructor functions
- Non-async generator functions
- Callbacks to ``.sort()`` on an array

To access to the results of database calls, use `async functions
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function>`__,
`async generator functions
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of>`__,
or ``.map()``.

Constructors
~~~~~~~~~~~~

The following constructors do not work: 

.. code-block:: javascript
   :copyable: false
   
   // This code will fail
   class FindResults {
      constructor() {
         this.value = db.students.find();
      }
   }

   // This code will fail
   function listEntries() { return db.students.find(); }
   class FindResults {
      constructor() {
         this.value = listEntries();
      }
   }

Use an ``async`` function instead:

.. code-block:: javascript

   class FindResults {
      constructor() {
         this.value = ( async() => {
            return db.students.find();
         } )();
      }
   }

.. note::

   You can also create a method that performs a database operation
   inside a class as an alternative to working with asynchronous
   JavaScript.

   .. code-block::

      class FindResults {
         constructor() { }
         
         init() { this.value = db.students.find(); }
       }

   To use this class, first construct a class instance then call the
   ``.init()`` method.

Generator Functions
~~~~~~~~~~~~~~~~~~~

The following generator functions do not work: 

.. code-block:: javascript
   :copyable: false

   // This code will fail
   function* FindResults() {
      yield db.students.findMany();
   }

   // This code will fail
   function listEntries() { return db.students.findMany(); }
   function* findResults() {
      yield listEntries();
   }

Use an ``async generator function`` instead: 

.. code-block:: javascript

   function listEntries() { return db.students.findMany(); }
   async function* findResults() {
      yield listEntries();
   }

Array Sort
~~~~~~~~~~

The following array sort does not work: 

.. code-block:: javascript
   :copyable: false

   // This code will fail
   db.getCollectionNames().sort( ( collectionOne, collectionTwo ) => {
     return db[ collectionOne ].estimatedDocumentCount() - db[ collectionOne ].estimatedDocumentCount() )
   } );

Use ``.map()`` instead. 

.. code-block:: javascript

   db.getCollectionNames().map( collectionName => {
      return { collectionName, size: db[ collectionName ].estimatedDocumentCount() };
   } ).sort( ( collectionOne, collectionTwo ) => {
      return collectionOne.size - collectionTwo.size;
   } ).map( collection => collection.collectionName);

This approach to array sort is often more performant than the
equivalent unsupported code.

