
Create the list file for Debian 9 (Stretch):

.. code-block:: bash

   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-{+version+}.gpg ] http://repo.mongodb.org/apt/debian stretch/mongodb-org/{+version+} main" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+version+}.list
