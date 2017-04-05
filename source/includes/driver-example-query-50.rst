.. include:: /includes/templates/tabs.rst

.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find( { status: "A" }, { name: 1, status: 1, instock: { $slice: -1 } } )

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 50
            :end-before: End Example 50
