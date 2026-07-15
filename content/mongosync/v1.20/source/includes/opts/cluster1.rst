.. reference/configuration.txt
.. reference/mongosync.txt

Sets the :ref:`connection URI <mongodb-uri>` for the second cluster.
The second cluster can serve as either the source or the destination
in the sync process. Designate the source and destination clusters
in the call to the :ref:`c2c-api-start` API endpoint.

For more information on connecting ``mongosync``, see
:ref:`Connections <c2c-connecting>`.