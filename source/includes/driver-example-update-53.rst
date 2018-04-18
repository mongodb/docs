.. tabs-drivers::

   tabs:
   - id: shell
     content: |
       .. code-block:: javascript
       
          db.inventory.updateMany(
              { "qty" : { $lt: 50 } },
              {
                 $set: { "size.uom" : "cm", "status": "P" },
                 $currentDate : { "lastModified": true }
              }
          )

   - id: compass
     content: |
       1. Copy the following filter into the Compass query bar and click
          :guilabel:`Find`:
          
          .. code-block:: sh
          
             { "qty" : { $lt: 50 } }
       
       2. For each document, click the edit icon:

          .. figure:: /images/compass-example-update-53-edit.png
             :alt: Screenshot of the MongoDB Compass UI with a filter for all documents where the qty field values is less than 50. The edit button is moused over for the first returned document.
             :figwidth: 500px

       3. Make the following changes:
       
          - Expand the ``size`` field and update the ``uom`` value to ``cm``.
          - Change the value of the ``status`` field to ``P``.
          - Click inside the ``status`` field and click the plus button,
            then click :guilabel:`Add field after status`.
            Add a ``lastModified`` field, select ``Date`` as its type
            using the drop-down menu on the right, and input today's date:
          
          .. figure:: /images/compass-example-update-53-set-and-currentDate.png
             :alt: Screenshot of the MongoDB Compass interface where the first returned document has been edited to change the status field value to P and add a lastModified date field with value 2018-04-17.
             :figwidth: 500px

       4. Click :guilabel:`Update`.

   - id: python
     content: |
       .. literalinclude:: /driver-examples/test_examples.py
          :language: python
          :dedent: 8
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: motor
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/test_examples_motor.py
          :language: python
          :dedent: 8
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: java-sync
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: java-async
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
          :language: java
          :dedent: 8
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: nodejs
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/examples_tests.js
          :language: javascript
          :dedent: 8
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: php
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
          :language: php
          :dedent: 8
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: perl
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/driver-examples.t
          :language: perl
          :dedent: 4
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: ruby
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/shell_examples_spec.rb
          :language: ruby
          :dedent: 8
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: scala
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
          :language: scala
          :dedent: 4
          :start-after: Start Example 53
          :end-before: End Example 53

   - id: csharp
     content: |
       .. class:: copyable-code
       .. literalinclude:: /driver-examples/DocumentationExamples.cs
          :language: c#
          :dedent: 12
          :start-after: Start Example 53
          :end-before: End Example 53