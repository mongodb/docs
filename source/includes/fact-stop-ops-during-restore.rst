Stop Client Operations during Restoration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must ensure that the |service| cluster does not receive client
requests during restoration. You must either:

- Restore to a new |service| cluster and reconfigure your application
  to use that new cluster once the new deployment is running, or

- Ensure that the source |service| cluster cannot receive client
  requests while you restore data.
