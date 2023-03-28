To check the status of your |mongodb-multi|, use the following command on the central cluster:

.. code-block:: sh

   kubectl get mdbm <resource-name> -o yaml -w

With the ``-w`` (watch) flag set, when the configuration changes, the output
refreshes immediately until the status phase achieves the ``Running`` state.
To learn more about resource deployment statuses, see :doc:`/reference/troubleshooting`.
