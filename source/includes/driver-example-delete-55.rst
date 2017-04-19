.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.insertMany( [
               { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
               { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
               { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
               { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
               { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
            ]);

         .. only:: website

            You can run the operation in the web shell below:

            .. include:: /includes/fact-mws.rst

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 55
            :end-before: End Example 55

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 55
            :end-before: End Example 55
