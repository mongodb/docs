The following operation updates the **first** document with ``item`` equal
to ``paper``. The operation uses:

.. tabs-drivers::

   tabs:
   - id: shell
     content: |
       - :update:`~up.$set` to update the ``status`` field and the ``uom``
         field embedded in the ``size`` document. To access the fields within
         embedded documents, the operation uses :ref:`dot notation
         <document-dot-notation>`.

       - :update:`~up.$currentDate` to set the ``lastModified`` field to the
         current date.

       .. code-block:: javascript
       
          db.inventory.updateOne(
              { "item" : "paper" }, // specifies the document to update
              {
                $set: {  "size.uom" : "cm",  "status" : "P" },
                $currentDate: { "lastModified": true }
              }
          )

   - id: compass
     content: |
         1. Copy the following filter into the Compass query bar and click
            :guilabel:`Find`:
            
            .. code-block:: sh
            
               { "item" : "paper" }
         
         2. Click the edit icon on the first document returned:


            .. figure:: /images/compass-example-update-52-find.png
               :alt: Screenshot of the MongoDB Compass interface searching for documents in the inventory collection in the test database where the "item" field value is "paper". One document is displayed.
               :width: 100%

            
         3. Expand the ``size`` field and update the ``uom`` value to ``cm``.
            Click inside the ``status`` field and click the plus button,
            then click :guilabel:`Add field after status`.
            Add a ``lastModified`` field, select ``Date`` as its type
            using the drop-down menu on the right, and input today's date:
            
            .. figure:: /images/compass-example-update-52-set-and-currentDate.png
               :alt: Screenshot of the MongoDB Compass interface where the first returned document has been edited to change the size.uom field value to "cm" and add a lastModified date field with value 2018-04-17.
               :width: 100%


         4. Click :guilabel:`Update`.
         
            .. figure:: /images/compass-example-update-52-finalize.png
               :alt: Screenshot of the MongoDB Compass interface where the "Update" button is selected to finalize the changes made to a document.
               :width: 100%


   - id: python
     content: |
       - ``$set`` to update the ``status`` field and the ``uom``
         field embedded in the ``size`` document. To access the fields within
         embedded documents, the operation uses :ref:`dot notation
         <document-dot-notation>`.

       - :``$currentDate`` to set the ``lastModified`` field to the
         current date.
       
       .. literalinclude:: /driver-examples/test_examples.py
          :language: python
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52
       
       Run the loop:
       
       .. code-block:: python
       
          loop = asyncio.get_event_loop()
          loop.run_until_complete(do_update_one())

   - id: motor
     content: |
       - ``$set`` to update the ``status`` field and the ``uom``
         field embedded in the ``size`` document. To access the fields within
         embedded documents, the operation uses :ref:`dot notation
         <document-dot-notation>`.

       - ``$currentDate`` to set the ``lastModified`` field to the
         current date.

       .. literalinclude:: /driver-examples/test_examples_motor.py
          :language: python
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52
       
       For completeness, the following example shows how you might wrap
       the update one operation with the asyncio event loop:
       
       .. code-block:: python
       
          async def do_update_one():
              document = await db.inventory.update_one(
                             {"item": "paper"},
                             {"$set": {"size.uom": "cm", "status": "P"},
                              "$currentDate": {"lastModified": True}})
              pprint.pprint(document.raw_result)

   - id: java-sync
     content: |
       - :java-sync-api:`set <com/mongodb/client/model/Updates.html#set-java.lang.String-TItem->` 
         to update the ``status`` field and the ``uom``
         field embedded in the ``size`` document. To access the fields within
         embedded documents, the operation uses :ref:`dot notation
         <document-dot-notation>`.

       - :java-sync-api:`currentDate <com/mongodb/client/model/Updates.html#currentDate-java.lang.String->` 
         to set the ``lastModified`` field to the
         current date.
       
       .. literalinclude:: /driver-examples/DocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: nodejs
     content: |
       .. literalinclude:: /driver-examples/examples_tests.js
          :language: javascript
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

       - ``$set`` to update the ``status`` field and the ``uom``
         field embedded in the ``size`` document. To access the fields within
         embedded documents, the operation uses :ref:`dot notation
         <document-dot-notation>`.

       - :``$currentDate`` to set the ``lastModified`` field to the
         current date.

   # - id: java-async
   #   content: |
   #     .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
   #        :language: java
   #        :dedent: 8
   #        :start-after: Start Example 52
   #        :end-before: End Example 52
   # 
   # - id: php
   #   content: |
   #     .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
   #        :language: php
   #        :dedent: 8
   #        :start-after: Start Example 52
   #        :end-before: End Example 52
   #
   # - id: perl
   #   content: |
   #     .. literalinclude:: /driver-examples/driver-examples.t
   #        :language: perl
   #        :dedent: 4
   #        :start-after: Start Example 52
   #        :end-before: End Example 52
   #
   # - id: ruby
   #   content: |
   #     .. literalinclude:: /driver-examples/shell_examples_spec.rb
   #        :language: ruby
   #        :dedent: 8
   #        :start-after: Start Example 52
   #        :end-before: End Example 52
   #
   # - id: scala
   #   content: |
   #     .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
   #        :language: scala
   #        :dedent: 4
   #        :start-after: Start Example 52
   #        :end-before: End Example 52

   - id: csharp
     content: |
       .. literalinclude:: /driver-examples/DocumentationExamples.cs
          :language: c#
          :dedent: 12
          :start-after: Start Example 52
          :end-before: End Example 52