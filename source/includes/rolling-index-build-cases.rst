Only use a :ref:`rolling index build <rolling-index-build>` if your
deployment matches one of the following cases:

- If your average CPU utilization exceeds (N-1)/N-10% where where N is
  the number of CPU threads available to mongod
- If your WiredTiger cache fill ratio regularly exceeds 90&

.. note::

   If your deployment does not meet this criteria, use the
   :ref:`default index build <index-operations>`. 
