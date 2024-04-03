DuplicateKeyException
~~~~~~~~~~~~~~~~~~~~~

If you perform a write operation that stores a duplicate value that violates
a :ref:`unique index <pymongo-unique-index>`, the driver raises a
``DuplicateKeyException``, and MongoDB throws an error resembling the following:

.. code-block:: none
   :copyable: false

   E11000 duplicate key error index