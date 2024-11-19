
Create the list file for Debian 12 (Bookworm):

.. code-block:: bash

   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.com/apt/debian bookworm/mongodb-enterprise/8.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
