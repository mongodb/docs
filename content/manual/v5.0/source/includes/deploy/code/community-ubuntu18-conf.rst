Create the list file for Ubuntu 18.04 (Bionic):

.. code-block:: bash

   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-{+version+}.gpg ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/{+version+} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+version+}.list

