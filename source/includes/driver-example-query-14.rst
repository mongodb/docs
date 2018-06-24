.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.insertMany( [
               { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
               { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
               { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
               { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
               { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
            ]);

     - id: compass
       content: |
         .. code-block:: javascript

           [
               { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
               { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
               { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
               { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
               { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
           ]

         For instructions on inserting documents in MongoDB Compass, see
         :doc:`Insert Documents </tutorial/insert-documents/>`.

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14

     - id: java-sync
       content: |

         First you will need to create the MongoCollection object you would like to query against.

         .. code-block:: sh

            MongoCollection<Document> collection = db.getCollection("inventory");

         Now add the ``insertMany`` call.

         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 14
            :end-before: End Example 14

     #- id: php
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
     #       :language: php
     #       :dedent: 8
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     #- id: perl
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /driver-examples/driver-examples.t
     #       :language: perl
     #       :dedent: 4
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     #- id: ruby
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /driver-examples/shell_examples_spec.rb
     #       :language: ruby
     #       :dedent: 6
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     #- id: scala
     #  content: |
     #    .. class:: copyable-code
     #    .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
     #       :language: scala
     #       :dedent: 4
     #       :start-after: Start Example 14
     #       :end-before: End Example 14

     - id: csharp
       content: |

         First you will need to initialize the collection.

         .. code-block:: sh

            var collection = database.GetCollection<BsonDocument>("inventory");

         Next create the array of BsonDocuments and pass it to the ``insertMany`` call on ``collection``.

         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 14
            :end-before: End Example 14
