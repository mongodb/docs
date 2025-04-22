
From a terminal, install ``gnupg`` if it is not already available:

.. code-block:: bash

     sudo apt-get install gnupg
   
Issue the following command to import the
MongoDB public GPG Key from `<https://pgp.mongodb.com/server-{+version+}.asc>`_:

.. code-block:: bash

   curl -fsSL https://pgp.mongodb.com/server-{+version+}.asc | \
      sudo gpg -o /usr/share/keyrings/mongodb-server-{+version+}.gpg \
      --dearmor
 
