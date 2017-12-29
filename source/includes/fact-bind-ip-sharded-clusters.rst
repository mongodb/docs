.. note::

   The :option:`--bind_ip` option must be specified when
   the sharded cluster members are run on different hosts or if
   remote clients connect to the sharded cluster. If you are
   deploying the entire sharded cluster on a single host and
   do not require external client connections, you can omit the
   :option:`--bind_ip` option. For more information, see
   :ref:`3.6-bind_ip-compatibility`.