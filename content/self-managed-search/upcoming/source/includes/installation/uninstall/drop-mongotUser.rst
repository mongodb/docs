To drop the ``mongot`` user, run the following commands, replacing
``<mongot_username>`` with the username you created for ``mongot``:

.. code-block:: javascript

   use admin
   db.dropUser("<mongot_username>")

For details, see :method:`db.dropUser()`.
