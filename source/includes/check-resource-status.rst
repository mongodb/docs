To check the status of your |k8s-mdbrsc|, invoke the following
command:

.. code-block:: sh

   kubectl get mdb <resource-name> -o yaml -w

The ``-w`` flag means "watch". With the "watch" flag set, the output
refreshes immediately when the configuration changes until the status phase
achieves the ``Running`` state.

See :doc:`/reference/troubleshooting` for information about the resource
deployment statuses.
