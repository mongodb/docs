.. include:: /includes/templates/tabs.rst

.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.updateOne(
               { item: "paper" },
               {
                 $set: { "size.uom": "cm", status: "P" },
                 $currentDate: { lastModified: true }
               }
            )

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 52
            :end-before: End Example 52
