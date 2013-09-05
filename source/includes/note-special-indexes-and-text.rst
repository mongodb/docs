.. note::

   You cannot combine the :dbcommand:`text` command, which requires a
   special :ref:`text index <create-text-index>`, with a query operator
   that requires a different type of special index. For example you
   cannot combine :dbcommand:`text` with the :operator:`$near` operator.

.. TODO this will be fixed in 2.6 and can be removed.
