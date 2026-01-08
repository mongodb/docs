DeprecationWarning: Count Is Deprecated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

{+driver-short+} no longer supports the ``count()`` method.
Instead, use the ``count_documents()`` method from the ``Collection`` class.

.. important::
  
   The ``count_documents()`` method belongs to the ``Collection`` class.
   If you try to call ``Cursor.count_documents()``,
   {+driver-short+} raises the following error:

   .. code-block::

      Traceback (most recent call last):
        File "<stdin>", line 1, in <module>
      AttributeError: 'Cursor' object has no attribute 'count'