Create the list file for Ubuntu 22.04 (Jammy):

.. code-block:: bash

   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-{+version+}.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/{+version+} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+version+}.list

