.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.insertMany([
               { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
               { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
               { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
               { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
               { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
            ]);

         .. only:: website

            You can run the operation in the web shell below:

            .. include:: /includes/fact-mws.rst

     - id: compass
       content: |
         .. code-block:: javascript

           [
             { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
             { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
             { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
             { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
             { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
           ]

         For instructions on inserting documents in MongoDB Compass, see
         :doc:`Insert Documents </tutorial/insert-documents/>`.


     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: java-sync
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: java-async
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_query_arrays.js
            :language: javascript
            :dedent: 4
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: ruby
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 6
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: scala
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: csharp
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 20
            :end-before: End Example 20

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 20
            :end-before: End Example 20
