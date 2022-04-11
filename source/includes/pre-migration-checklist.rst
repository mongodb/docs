Pre-Migration Checklist
~~~~~~~~~~~~~~~~~~~~~~~

Before starting the import process:

- If you don't already have a destination cluster, create a
  new |service| deployment and configure it as needed. For complete
  documentation on creating an |service| cluster, see
  :doc:`/tutorial/create-new-cluster`.

- After your |service| cluster is deployed, ensure that you can connect
  to it from all client hardware where your applications run. Testing
  your connection string helps ensure that your data migration process
  can complete with minimal downtime.

  1. Download and install {+mongosh+} on a
     representative client machine, if you don't already have it.

  #. Connect to your destination cluster using the connection string
     from the {+atlas-ui+}. For more information, see
     :ref:`connect-mongo-shell`.

  Once you have verified your connectivity to your target cluster,
  start the import procedure.