.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
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
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: java-sync
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: java-async
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: ruby
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: scala
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst

     - id: csharp
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 53
            :end-before: End Example 53

         .. include:: /includes/fact-update-many-operation-uses.rst
