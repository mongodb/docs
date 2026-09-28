You may use any non-admin :term:`namespace` to store your
{+key-vault-long+}. By convention, the examples throughout this
documentation use the  ``encryption.__keyVault`` :term:`namespace`.

.. warning::

   Do not use the ``admin`` database to store encryption-related
   collections. If you use the admin database for this collection, your 
   MongoDB client may not be able to access or decrypt your data due to 
   lack of permissions.
