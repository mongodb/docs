Append the name of the authentication database
to the username in the format:

.. code-block:: shell

   <username>?source=<database-name>

For example, if user ``dbUser`` is authenticated in
the ``admin`` database, the :guilabel:`User` field should
contain the string ``dbUser?source=admin``.
