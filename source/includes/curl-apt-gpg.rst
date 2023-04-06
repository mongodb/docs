
From a terminal, issue the following command to import the
MongoDB public GPG Key from `<https://pgp.mongodb.com/server-{+version+}.pub>`_:

.. code-block:: bash

   curl -fsSL https://pgp.mongodb.com/server-{+version+}.pub | \
      sudo gpg -o /usr/share/keyrings/mongodb-server-{+version+}.gpg

The operation should respond with an ``OK``. 

If you receive an error indicating that ``gnupg`` is not
installed, you can:
       
- Install ``gnupg`` and its required libraries using the following command:

  .. code-block:: bash

     sudo apt-get install gnupg
       
- Once installed, retry importing the key:

  .. code-block:: bash

     curl -fsSL https://pgp.mongodb.com/server-{+version+}.pub | \
        sudo gpg -o /usr/share/keyrings/mongodb-server-{+version+}.gpg
  
