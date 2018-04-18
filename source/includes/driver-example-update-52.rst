.. tabs-drivers::

   tabs:
   - id: shell
     content: |
       .. code-block:: javascript
       
          db.inventory.updateOne(
              { "item" : "paper" },
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
               :figwidth: 500px
            
         3. Expand the ``size`` field and update the ``uom`` value to ``cm``.
            Click inside the ``status`` field and click the plus button,
            then click :guilabel:`Add field after status`.
            Add a ``lastModified`` field, select ``Date`` as its type
            using the drop-down menu on the right, and input today's date:
            
            .. figure:: /images/compass-example-update-52-set-and-currentDate.png
               :alt: Screenshot of the MongoDB Compass interface where the first returned document has been edited to change the size.uom field value to "cm" and add a lastModified date field with value 2018-04-17.
               :figwidth: 500px

         4. Click :guilabel:`Update`.
         
            .. figure:: /images/compass-example-update-52-finalize.png
               :alt: Screenshot of the MongoDB Compass interface where the "Update" button is selected to finalize the changes made to a document.
               :figwidth: 500px

   - id: python
     content: |
       .. literalinclude:: /driver-examples/test_examples.py
          :language: python
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: motor
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/test_examples_motor.py
          :language: python
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: java-sync
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: java-async
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: nodejs
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/examples_tests.js
          :language: javascript
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: php
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
          :language: php
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: perl
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/driver-examples.t
          :language: perl
          :dedent: 4
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: ruby
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/shell_examples_spec.rb
          :language: ruby
          :dedent: 8
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: scala
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
          :language: scala
          :dedent: 4
          :start-after: Start Example 52
          :end-before: End Example 52

   - id: csharp
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExamples.cs
          :language: c#
          :dedent: 12
          :start-after: Start Example 52
          :end-before: End Example 52