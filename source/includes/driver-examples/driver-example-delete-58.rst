.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.deleteOne( { status: "D" } )

     - id: compass
       content: |

         1. Click the :guilabel:`Table` button in the top navigation
            to access the :ref:`Table View <documents-table-view>`:

            .. figure:: /images/compass-table-btn-click-2.png

            .. raw:: html

               <br>

         #. Use the Compass :ref:`query bar <query-bar-filter>` to
            locate the target document.

            Copy the following filter document into the query bar and click
            :guilabel:`Find`:

            .. class:: copyable-code
            .. code-block:: javascript

               { item: "paper" }

            .. figure:: /images/compass-delete-paper-find.png

            .. raw:: html

               <br>

         #. Hover over the document and click the trash icon which
            appears on the right-hand side:

            .. raw:: html

               <br>

            .. figure:: /images/compass-delete-button-click.png

            .. raw:: html

               <br>

            After clicking the delete button, the document is flagged
            for deletion and Compass asks for confirmation that you
            want to remove the document:

            .. raw:: html

               <br>

            .. figure:: /images/compass-delete-confirm.png

            .. raw:: html

               <br>

         #. Click :guilabel:`Delete` to confirm. Compass deletes the
            document from the collection.

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: motor
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples_motor.py
            :language: python
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: java-sync
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: java-async
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/AsyncDocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/node_remove.js
            :language: javascript
            :dedent: 6
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: ruby
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/shell_examples_spec.rb
            :language: ruby
            :dedent: 8
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: scala
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExampleSpec.scala
            :language: scala
            :dedent: 4
            :start-after: Start Example 58
            :end-before: End Example 58

     - id: csharp
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamples.cs
            :language: c#
            :dedent: 12
            :start-after: Start Example 58
            :end-before: End Example 58
