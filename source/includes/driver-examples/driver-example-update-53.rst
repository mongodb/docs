.. tabs-drivers::

   tabs:
     - id: shell
       content: |
                  .. code-block:: javascript

            db.inventory.updateMany(
               { "qty": { $lt: 50 } },
               {
                 $set: { "size.uom": "in", status: "P" },
                 $currentDate: { lastModified: true }
               }
            )

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: python
       content: |
                  .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

     - id: motor
       content: |
                  .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: java-sync
       content: |
                  .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: java-async
       content: |
                  .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: nodejs
       content: |
         .. literalinclude:: /driver-examples/node_update.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: php
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: perl
       content: |
                  .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: ruby
       content: |
                  .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: scala
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: csharp
       content: |
                  .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: go
       content: |
         .. literalinclude:: /driver-examples/go_examples.go
            :language: go
            :dedent: 2
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst
