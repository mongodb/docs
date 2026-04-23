
Create the list file for Ubuntu 20.04 (Focal):

.. code-block:: bash

   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-{+pgp-version+}.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/{+version+} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+version+}.list

