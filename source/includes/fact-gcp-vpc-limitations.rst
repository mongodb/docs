GCP-backed clusters configured for |service| Network Peering cannot:

* Be accessed by using the |service| hostname from outside the peered
  VPC. Note that database hosts' :ref:`public IPs <faq-public-ip-changes>`
  can be reached over the network if the client’s IP address is on the
  :ref:`IP whitelist <whitelist>`.

* Use |stitch-docs| apps.

* Use :doc:`Live Migration </import/live-import>`.
