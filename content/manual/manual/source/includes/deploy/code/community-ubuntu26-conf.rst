Create the list file for Ubuntu 26.04 (Resolute):

.. code-block:: bash

   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-{+pgp-version+}.gpg ] https://repo.mongodb.org/apt/ubuntu resolute/mongodb-org/{+version+} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+version+}.list

