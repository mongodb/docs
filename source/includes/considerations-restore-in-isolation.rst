You must ensure that the MongoDB deployment does not receive client
requests during restoration. You must either:

- restore to new systems with new hostnames and reconfigure your
  application code once the new deployment is running, *or*

- ensure that the MongoDB deployment will *not* receive client
  requests while you restore data.
