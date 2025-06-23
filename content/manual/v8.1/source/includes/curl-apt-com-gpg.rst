
From a terminal, install ``gnupg`` and ``curl`` if they are not already
available:

.. code-block:: bash

     sudo apt-get install gnupg curl

To import the MongoDB public GPG key, run the following command:

.. code-block:: bash

   curl -fsSL https://pgp.mongodb.com/server-{+version+}.asc | \
      sudo gpg -o /usr/share/keyrings/mongodb-server-{+version+}.gpg \
      --dearmor
