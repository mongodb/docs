Your connection string should use the following format:

.. code-block::

   mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

If you are connecting to a deployment in Docker, your connection string 
must use the :ref:`standard format <connections-standard-connection-string-format>` 
and specify ``directConnection=true``:

.. code-block::

   mongodb://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net/?directConnection=true
