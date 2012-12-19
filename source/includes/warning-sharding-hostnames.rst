.. warning:: Sharding and "localhost" Addresses

   If you use either "localhost" or ``127.0.0.1`` as the hostname
   portion of any host identifier, for example as the ``host`` argument
   to :dbcommand:`addShard` or the value to the
   :option:`--configdb <mongos --configdb>`
   run time option, then you must use "localhost" or
   ``127.0.0.1`` for *all* host settings for any MongoDB instances in
   the cluster. If you mix localhost addresses and remote host address,
   MongoDB will error.
