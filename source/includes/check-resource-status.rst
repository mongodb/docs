To check the status of your |k8s-mdbrsc|, invoke the following
command:

.. code-block:: sh

   kubectl get mdb <resource-name> -n <namespace> -o yaml -w

The ``-w`` flag means "watch". With the "watch" flag set, the output
refreshes immediately when something changes until the status phase
achieves the ``Running`` state.

If the deployment fails, see :doc:`/reference/troubleshooting`.
