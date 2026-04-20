.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         The operation uses a query predicate of
         ``{ rated: "G", runtime: { $lt: 90 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM movies WHERE rated = "G" AND runtime < 90

     - id: compass
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: c
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: python
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: motor
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: java-sync
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: java-async
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: kotlin-coroutine
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: nodejs
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: php
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: ruby
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: scala
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: csharp
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30

     - id: go
       content: |
         The operation uses a query predicate of
         ``{ status: "A", qty: { $lt: 30 } }``, which
         corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A" AND qty < 30
