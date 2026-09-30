To check the status of your |k8s-mdbrsc|, use the following
command:

.. code-block:: sh

   kubectl get mdb <resource-name> -o yaml -w

With the ``-w`` (watch) flag set, when the configuration changes, the output
refreshes immediately until the status phase achieves the ``Running`` state.
To learn more about resource deployment statuses, see :doc:`/reference/troubleshooting`.
