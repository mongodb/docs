Restart the ``mongod`` process to apply the new TLS configuration.
To apply the configuration without downtime, restart nodes in a rolling fashion.

On each host for your deployment, starting with the secondary nodes
and finishing with the primary node, run the following: 

.. code-block:: sh
   
   sudo systemctl restart mongod

To verify that the rolling restart completed successfully, run the following 
command on each host: 

.. code-block:: sh

   sudo systemctl status mongod