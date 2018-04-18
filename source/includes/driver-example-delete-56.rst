.. tabs-drivers::

   tabs:
   - id: shell
     content: |
       .. code-block:: javascript
       
          db.inventory.deleteMany(
              { }
          )

   - id: compass
     content: |
       To delete all of the documents in a collection from MongoDB
       Compass, you can either delete each document one-by-one or delete
       the entire collection using the garbage can icon next to the collection
       name in the collection list, as in the following:
       
       .. figure:: /images/compass-example-delete-59-drop-collection.png
          :alt: Screenshot of the MongoDB Compass UI showing the Drop Collection icon next to the inventory collection name.
          :figwidth: 500px

   - id: python
     content: |
       .. literalinclude:: /driver-examples/test_examples.py
          :language: python
          :dedent: 8
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: motor
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/test_examples_motor.py
          :language: python
          :dedent: 8
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: java-sync
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: java-async
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: nodejs
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/examples_tests.js
          :language: javascript
          :dedent: 8
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: php
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
          :language: php
          :dedent: 8
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: perl
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/driver-examples.t
          :language: perl
          :dedent: 4
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: ruby
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/shell_examples_spec.rb
          :language: ruby
          :dedent: 8
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: scala
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
          :language: scala
          :dedent: 4
          :start-after: Start Example 56
          :end-before: End Example 56

   - id: csharp
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExamples.cs
          :language: c#
          :dedent: 12
          :start-after: Start Example 56
          :end-before: End Example 56