.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find(  { size: { w: 21, h: 14, uom: "cm" } }  )

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 16
            :end-before: End Example 16

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 16
            :end-before: End Example 16

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 16
            :end-before: End Example 16
