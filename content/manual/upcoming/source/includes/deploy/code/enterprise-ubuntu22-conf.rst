
Create the list file for Ubuntu 22.04 (Jammy):

.. code-block:: bash

   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.com/apt/ubuntu jammy/mongodb-enterprise/{+version+} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise-{+version+}.list

