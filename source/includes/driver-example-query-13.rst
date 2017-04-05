.. include:: /includes/templates/tabs.rst

.. tabs::

   tabs:
     - id: shell
       content: |
         .. class:: copyable-code
         .. code-block:: javascript

            db.inventory.find( {
                 status: "A",
                 $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
            } )
         

     - id: python
       content: |
         .. class:: copyable-code
         .. literalinclude:: /driver-examples/test_examples.py
            :language: python
            :dedent: 8
            :start-after: Start Example 13
            :end-before: End Example 13