
From a terminal, install ``gnupg`` and ``curl`` if they are not already
available:

.. code-block:: bash

     sudo apt-get install gnupg curl

Click the appropriate tab for your version of Ubuntu:

.. tabs::

   .. tab:: Ubuntu 22.04 (Jammy)
      :tabid: jammy

      To import the MongoDB public GPG key from
      `<https://pgp.mongodb.com/server-{+version+}.asc>`__, run the
      following command:

      .. code-block:: bash

         curl -fsSL https://pgp.mongodb.com/server-{+version+}.asc | \
            sudo gpg -o /etc/apt/trusted.gpg.d/mongodb-server-{+version+}.gpg \
            --dearmor

      To learn more about the ``--dearmor`` flag, see `dearmor
      <https://manpages.ubuntu.com/manpages/jammy/man1/sq-dearmor.1.html>`__
      in the Ubuntu documentation.

   .. tab:: Ubuntu 20.04 (Focal)
      :tabid: focal

      To import the MongoDB public GPG key from
      `<https://pgp.mongodb.com/server-{+version+}.asc>`__, run the
      following command:

      .. code-block:: bash

         curl -fsSL https://pgp.mongodb.com/server-{+version+}.asc | \
            sudo gpg -o /usr/share/keyrings/mongodb-server-{+version+}.gpg \
            --dearmor

      To learn more about the ``--dearmor`` flag, see `dearmor
      <https://manpages.ubuntu.com/manpages/lunar/en/man1/sq-dearmor.1.html>`__
      in the Ubuntu documentation.
