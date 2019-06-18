GCP-backed clusters configured for |service| Network Peering cannot:

* Be accessed by using the |service| hostname from outside the peered
  VPC. If the database host's public IP is used and the connecting
  client's IP address is on the :ref:`IP whitelist <whitelist>`, the
  cluster can be accessed from outside the VPC.

* Use |stitch-docs| apps.

* Use :doc:`Live Migration </import/live-import>`.
