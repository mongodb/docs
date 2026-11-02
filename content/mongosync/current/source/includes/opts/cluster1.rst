.. reference/configuration.txt
.. reference/mongosync.txt

Sets the :ref:`connection URI <mongodb-uri>` for the second cluster.
The second cluster can serve as either the source or the destination
in the sync process. Designate the source and destination clusters
in the call to the :ref:`c2c-api-start` API endpoint.

For more information on connecting ``mongosync``, see
:ref:`Atlas to Atlas <c2c-conn-atlas2atlas>`,
:ref:`Self-Managed to Self-Managed <c2c-conn-oprem2onprem>`, or
:ref:`Self-Managed to Atlas <c2c-conn-onprem2atlas>`.