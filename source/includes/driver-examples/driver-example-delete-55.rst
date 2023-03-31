.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.insertMany( [
               { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
               { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
               { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
               { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
               { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
            ] );

     - id: compass
       content: |
         .. code-block:: javascript

            [
                { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
                { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "P" },
                { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
                { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
                { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
            ]

         For instructions on inserting documents in MongoDB Compass, see
         :doc:`Insert Documents </tutorial/insert-documents/>`.

         .. note::

            For complete reference on inserting documents in MongoDB
            Compass, see the
            :ref:`Compass documentation <insert-documents>`.

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: java-sync
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: java-async
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/node_remove.js
            :language: javascript
            :dedent: 4
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: ruby
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 6
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: scala
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: csharp
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 55
            :end-before: End Example 55
