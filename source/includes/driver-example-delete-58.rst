.. tabs-drivers::

   tabs:
   - id: shell
     content: |
       .. code-block:: javascript

          db.inventory.deleteOne(
              { "status": "D" } // specifies the document to delete
          )

   - id: compass
     content: |
       1. Copy the following filter into the Compass query bar and click
          :guilabel:`Find`:
          
          .. code-block:: sh
          
             { "status" : "D" }
       
       2. Click the delete icon on the first document:

          .. figure:: /images/compass-example-delete-58-delete-icon.png
             :alt: Screenshot of the MongoDB Compass UI with a filter for all documents where the "status" field value is "D". The Delete icon is moused over for the first returned document.
             :width: 100%

             
       3. The document will be "Flagged for Deletion", click
          :guilabel:`Delete` to confirm.
          
          .. figure:: /images/compass-example-delete-58-finalize.png
             :alt: Screenshot of the MongoDB Compass UI with a filter for all documents where the "status" field value is "D". The first document is flagged for deletion with a red bar and a button to cancel or confirm the deletion.
             :width: 100%

   - id: python
     content: |
       .. literalinclude:: /driver-examples/test_examples.py
          :language: python
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58

   - id: motor
     content: |
       .. literalinclude:: /driver-examples/test_examples_motor.py
          :language: python
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58

   - id: java-sync
     content: |
       .. literalinclude:: /driver-examples/DocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58

   - id: java-async
     content: |
       .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58

   - id: nodejs
     content: |
       .. literalinclude:: /driver-examples/examples_tests.js
          :language: javascript
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58

   # - id: php
   #   content: |
   #     .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   #        :language: php
   #        :dedent: 8
   #        :start-after: Start Example 58
   #        :end-before: End Example 58
   #
   # - id: perl
   #   content: |
   #     .. literalinclude:: /driver-examples/driver-examples.t
   #        :language: perl
   #        :dedent: 4
   #        :start-after: Start Example 58
   #        :end-before: End Example 58
   #
   # - id: ruby
   #   content: |
   #     .. literalinclude:: /driver-examples/shell_examples_spec.rb
   #        :language: ruby
   #        :dedent: 8
   #        :start-after: Start Example 58
   #        :end-before: End Example 58
   #
   # - id: scala
   #   content: |
   #     .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
   #        :language: scala
   #        :dedent: 4
   #        :start-after: Start Example 58
   #        :end-before: End Example 58

   - id: csharp
     content: |
       .. literalinclude:: /driver-examples/DocumentationExamples.cs
          :language: c#
          :dedent: 12
          :start-after: Start Example 58
          :end-before: End Example 58
