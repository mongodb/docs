.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. code-block:: javascript

            db.inventory.insertOne(
               { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
            )

     - id: compass
       content: |
         .. figure:: /images/compass-insert-document-inventory.png

     - id: python
       content: |
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: motor
       content: |
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: java-sync
       content: |
         Next, populate a Document with fields and an embedded document,
         and insert it into the database.

         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: java-async
       content: |
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1

     - id: nodejs
       content: |   
         .. literalinclude:: /driver-examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 1
            :end-before: End Example 1


     - id: csharp
       content: |
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 1
            :end-before: End Example 1

     # - id: php
     #   content: |
     #     .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
     #        :language: php
     #        :dedent: 8
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
     # 
     # - id: perl
     #   content: |
     #     .. literalinclude:: /driver-examples/driver-examples.t
     #        :language: perl
     #        :dedent: 4
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
     # 
     # - id: ruby
     #   content: |
     #     .. literalinclude:: /driver-examples/shell_examples_spec.rb
     #        :language: ruby
     #        :dedent: 6
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
     # 
     # - id: scala
     #   content: |
     #     .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
     #        :language: scala
     #        :dedent: 4
     #        :start-after: Start Example 1
     #        :end-before: End Example 1
