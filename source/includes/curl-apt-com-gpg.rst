
From a terminal, install ``gnupg`` and ``curl`` if they are not already
available:

.. code-block:: bash

     sudo apt-get install gnupg curl
   
Issue the following command to import the
MongoDB public GPG Key from `<https://pgp.mongodb.com/server-{+version+}.asc>`_:

.. code-block:: bash

   curl -fsSL https://pgp.mongodb.com/server-{+version+}.asc | \
      sudo gpg -o /usr/share/keyrings/mongodb-server-{+version+}.gpg \
      --dearmor
 
