|service| live migration stops the :manual:`sharded cluster balancer
</core/sharding-balancer-administration/>` on the source {+cluster+} at
the start of the procedure, and starts the balancer at the end of the
procedure.

If you cancel live migration, |service| restarts the balancer on the
source {+cluster+}.

.. note::

   Under some circumstances |service| can't restart the balancer on the
   source {+cluster+} at the end of a live migration process. If the balancer
   fails to restart, the live migration still succeeds, but a warning banner
   indicates that you must :manual:`manually restart </tutorial/manage-sharded-cluster-balancer/>`
   the source {+cluster+} balancer.
