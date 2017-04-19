.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.insertMany( [
               { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
               { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
               { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
               { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
               { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
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
            :start-after: Start Example 29
            :end-before: End Example 29

     - id: php
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/DocumentationExamplesTest.php
            :language: php
            :dedent: 8
            :start-after: Start Example 29
            :end-before: End Example 29

     - id: perl
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/driver-examples.t
            :language: perl
            :dedent: 4
            :start-after: Start Example 29
            :end-before: End Example 29
