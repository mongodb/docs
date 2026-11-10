Use this procedure if you have disabled the balancer and are ready to
re-enable it:

#. Connect to any :binary:`~bin.mongos` in the cluster using the
   :binary:`~bin.mongosh` shell.

#. Issue one of the following operations to enable the balancer:

   From the ``mongosh`` shell, run:

   .. code-block:: javascript

      sh.startBalancer()

   .. note::

      To enable the balancer from a driver, use the :command:`balancerStart`
      command against the ``admin`` database, as in the following:

      .. code-block:: javascript

         db.adminCommand( { balancerStart: 1 } )

   .. include:: /includes/extracts/4.2-changes-start-balancer-autosplit.rst


