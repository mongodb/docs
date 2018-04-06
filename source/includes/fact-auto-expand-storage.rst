- :guilabel:`Auto-Expand Storage`: When disk usage reaches 90%,
  automatically increase storage by an amount necessary to achieve 70% 
  utilization. Changes to storage capacity affects
  :ref:`cost <instance-size-costs>`.

  .. note::

     If the size of the cluster :term:`oplog` is small, |service|
     may be unable to automatically expand disk capacity.