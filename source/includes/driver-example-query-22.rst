.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find( { tags: { $all: ["red", "blank"] } } )

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 22
            :end-before: End Example 22

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 22
            :end-before: End Example 22

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 22
            :end-before: End Example 22
