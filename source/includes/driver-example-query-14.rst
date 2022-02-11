.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. code-block:: javascript

            db.inventory.insertMany( [
               { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
               { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
               { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
               { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
               { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
            ]);

     - id: compass
       content: |
         .. code-block:: javascript

           [
               { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
               { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
               { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
               { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
               { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
           ]

         For instructions on inserting documents in MongoDB Compass, see
         :doc:`Insert Documents </server/insert>`.

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /includes/examples/curl_examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14

     - id: go
       content: |
         .. class:: copyable-code
         .. literalinclude:: /includes/examples/curl_examples/examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 14
            :end-before: End Example 14

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /includes/examples/curl_examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14
        
         For completeness, this is how you might wrap this call and run
         it with the asyncio event loop.

         .. code-block:: python

            async def do_insert_many():
                # Subdocument key order matters in a few of these examples so we have
                # to use bson.son.SON instead of a Python dict.
                from bson.son import SON
                await db.inventory.insert_many([
                    {"item": "journal",
                     "qty": 25,
                     "size": SON([("h", 14), ("w", 21), ("uom", "cm")]),
                     "status": "A"},
                    {"item": "notebook",
                     "qty": 50,
                     "size": SON([("h", 8.5), ("w", 11), ("uom", "in")]),
                     "status": "A"},
                    {"item": "paper",
                     "qty": 100,
                     "size": SON([("h", 8.5), ("w", 11), ("uom", "in")]),
                     "status": "D"},
                    {"item": "planner",
                     "qty": 75,
                     "size": SON([("h", 22.85), ("w", 30), ("uom", "cm")]),
                     "status": "D"},
                    {"item": "postcard",
                     "qty": 45,
                     "size": SON([("h", 10), ("w", 15.25), ("uom", "cm")]),
                     "status": "A"}])
    
            loop = asyncio.get_event_loop()
            loop.run_until_complete(do_insert_many())

     - id: java-sync
       content: |

         First you will need to create the MongoCollection object you would like to query against.

         .. code-block:: java

            MongoCollection<Document> collection = db.getCollection("inventory");

         Now add the ``insertMany`` call.

         .. class:: copyable-code
         .. literalinclude:: /includes/examples/curl_examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. literalinclude:: /includes/examples/curl_examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14

     #- id: php
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /includes/examples/curl_examples/DocumentationExamplesTest.php
     #       :language: php
     #       :dedent: 8
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     #- id: perl
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /includes/examples/curl_examples/driver-examples.t
     #       :language: perl
     #       :dedent: 4
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     #- id: ruby
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /includes/examples/curl_examples/shell_examples_spec.rb
     #       :language: ruby
     #       :dedent: 6
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     #- id: scala
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /includes/examples/curl_examples/DocumentationExampleSpec.scala
     #       :language: scala
     #       :dedent: 4
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     - id: csharp
       content: |

         First you will need to initialize the collection.

         .. code-block:: c#

            var collection = database.GetCollection<BsonDocument>("inventory");

         Next create the array of BsonDocuments and pass it to the ``insertMany`` call on ``collection``.

         .. class:: copyable-code
         .. literalinclude:: /includes/examples/curl_examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 14
            :end-before: End Example 14
