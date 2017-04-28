.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find( { status: "A" }, { status: 0, instock: 0 } )

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: java-sync
       content: |
         The example uses the com.mongodb.client.model.Projections_
         class to create the projection documents.

         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationSamples.java
            :language: java
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: nodejs
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/examples_tests.js
            :language: javascript
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 46
            :end-before: End Example 46

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 46
            :end-before: End Example 46
