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
          
          .. code-block:: javascript
          
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
       .. literalinclude:: /includes/examples/curl_examples/test_examples.py
          :language: python
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58

   - id: motor
     content: |
       .. literalinclude:: /includes/examples/curl_examples/test_examples_motor.py
          :language: python
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58
       
       For completeness, the following example shows how you might wrap
       the delete one operation with the asyncio event loop:

       .. code-block:: python

          async def do_delete_one():
              document = await db.inventory.delete_one({"status": "D"})
              pprint.pprint(document.raw_result)

   - id: go
     content: |

       
      Before deleting the data, you'll need to assign the ``inventory`` collection in the ``test`` database to a variable:

      .. literalinclude:: /includes/examples/go/assign/assign.go
         :language: go
         :dedent: 1
         :start-after: Start Collection
         :end-before: End Collection

      Followed by:

      .. literalinclude:: /includes/examples/curl_examples/examples.go
          :language: go
          :dedent: 1
          :start-after: Start Example 58
          :end-before: End Example 58
           

   - id: java-sync
     content: |
       .. literalinclude:: /includes/examples/curl_examples/DocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58

   - id: nodejs
     content: |
       .. literalinclude:: /includes/examples/curl_examples/examples_tests.js
          :language: javascript
          :dedent: 8
          :start-after: Start Example 58
          :end-before: End Example 58


   # - id: java-async
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/AsyncDocumentationSamples.java
   #        :language: java
   #        :dedent: 8
   #        :start-after: Start Example 58
   #        :end-before: End Example 58
   # 
   # - id: php
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/DocumentationExamplesTest.php
   #        :language: php
   #        :dedent: 8
   #        :start-after: Start Example 58
   #        :end-before: End Example 58
   #
   # - id: perl
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/driver-examples.t
   #        :language: perl
   #        :dedent: 4
   #        :start-after: Start Example 58
   #        :end-before: End Example 58
   #
   # - id: ruby
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/shell_examples_spec.rb
   #        :language: ruby
   #        :dedent: 8
   #        :start-after: Start Example 58
   #        :end-before: End Example 58
   #
   # - id: scala
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/DocumentationExampleSpec.scala
   #        :language: scala
   #        :dedent: 4
   #        :start-after: Start Example 58
   #        :end-before: End Example 58

   - id: csharp
     content: |
       .. literalinclude:: /includes/examples/curl_examples/DocumentationExamples.cs
          :language: c#
          :dedent: 12
          :start-after: Start Example 58
          :end-before: End Example 58
