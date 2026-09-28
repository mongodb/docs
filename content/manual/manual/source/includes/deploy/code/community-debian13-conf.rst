
Create the list file for Debian 13 (Trixie):

.. code-block:: bash

   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-{+version+}.gpg ] https://repo.mongodb.org/apt/debian trixie/mongodb-org/{+version+} main" | sudo tee /etc/apt/sources.list.d/mongodb-org-{+version+}.list
