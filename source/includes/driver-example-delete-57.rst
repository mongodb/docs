.. tabs-drivers::

   tabs:
   - id: shell
     content: |
       .. code-block:: javascript
       
          db.inventory.deleteMany(
              { "status" : "A" } // specifies the documents to delete
          )

   - id: compass
     content: |

       .. note:: 
          Deleting multiple documents in Compass is a manual
          process. If you need to delete many documents, consider using
          the :binary:`~bin.mongo` shell or a driver.

       1. Copy the following filter into the Compass query bar and click
          :guilabel:`Find`:
          
          .. code-block:: javascript
          
             { "status" : "A" }
       
       2. For each document, click the delete icon:

          .. figure:: /images/compass-example-delete-57-delete-icon.png
             :alt: Screenshot of the MongoDB Compass UI with a filter for all documents where the "status" field value is "A". The Delete icon is moused over for the first returned document.
             :width: 100%
             
       3. The document will be "Flagged for Deletion", click
          :guilabel:`Delete` to confirm.
          
          .. figure:: /images/compass-example-delete-57-finalize.png
             :alt: Screenshot of the MongoDB Compass UI with a filter for all documents where the "status" field value is "D". The first document is flagged for deletion with a red bar and a button to cancel or confirm the deletion.
             :width: 100%

   - id: python
     content: |
       .. literalinclude:: /includes/examples/curl_examples/test_examples.py
          :language: python
          :dedent: 8
          :start-after: Start Example 57
          :end-before: End Example 57

   - id: motor
     content: |
       .. literalinclude:: /includes/examples/curl_examples/test_examples_motor.py
          :language: python
          :dedent: 8
          :start-after: Start Example 57
          :end-before: End Example 57
       
       For completeness, the following example shows how you might wrap
       the delete many operation with the asyncio event loop:

       .. code-block:: python

          async def do_delete_many():
              document = await db.inventory.delete_many({"status": "A"})
              pprint.pprint(document.raw_result)

       Run the loop to execute both the ``delete_one`` and ``delete_many``
       operations:
       
       .. code-block:: python
       
          loop = asyncio.get_event_loop()

          tasks = [ 
              asyncio.ensure_future(do_delete_one()),
              asyncio.ensure_future(do_delete_many()), 
          ]

          loop.run_until_complete(asyncio.wait(tasks))
          loop.close()

   - id: java-sync
     content: |
       .. literalinclude:: /includes/examples/curl_examples/DocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 57
          :end-before: End Example 57

   - id: go
     content: |
       .. literalinclude:: /includes/examples/curl_examples/examples.go
          :language: go
          :dedent: 1
          :start-after: Start Example 57
          :end-before: End Example 57       


   - id: nodejs
     content: |
       .. literalinclude:: /includes/examples/curl_examples/examples_tests.js
          :language: javascript
          :dedent: 8
          :start-after: Start Example 57
          :end-before: End Example 57


   # - id: java-async
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/AsyncDocumentationSamples.java
   #        :language: java
   #        :dedent: 8
   #        :start-after: Start Example 57
   #        :end-before: End Example 57
   # 
   # - id: php
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/DocumentationExamplesTest.php
   #        :language: php
   #        :dedent: 8
   #        :start-after: Start Example 57
   #        :end-before: End Example 57
   #
   # - id: perl
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/driver-examples.t
   #        :language: perl
   #        :dedent: 4
   #        :start-after: Start Example 57
   #        :end-before: End Example 57
   #
   # - id: ruby
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/shell_examples_spec.rb
   #        :language: ruby
   #        :dedent: 8
   #        :start-after: Start Example 57
   #        :end-before: End Example 57
   #
   # - id: scala
   #   content: |
   #     .. literalinclude:: /includes/examples/curl_examples/DocumentationExampleSpec.scala
   #        :language: scala
   #        :dedent: 4
   #        :start-after: Start Example 57
   #        :end-before: End Example 57

   - id: csharp
     content: |
       .. literalinclude:: /includes/examples/curl_examples/DocumentationExamples.cs
          :language: c#
          :dedent: 12
          :start-after: Start Example 57
          :end-before: End Example 57
