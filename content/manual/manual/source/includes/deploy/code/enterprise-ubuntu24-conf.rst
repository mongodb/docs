
Create the list file for Ubuntu 24.04 (Noble):

.. code-block:: bash

   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-{+version+}.gpg ] https://repo.mongodb.com/apt/ubuntu noble/mongodb-enterprise/{+version+} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise-{+version+}.list

