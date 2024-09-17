
Create the list file for Ubuntu 18.04 (Bionic).

.. code-block:: bash

   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-{+version+}.gpg ] http://repo.mongodb.com/apt/ubuntu bionic/mongodb-enterprise/{+version+} multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise-{+version+}.list

