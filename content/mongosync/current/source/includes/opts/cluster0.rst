.. reference/configuration.txt
.. reference/mongosync.txt

Sets the :ref:`connection URI <mongodb-uri>` for the first cluster.
The first cluster is the source cluster in the sync process. When you
call the :ref:`c2c-api-start` API endpoint, you must specify
``cluster0`` as the source.

For more information on connecting ``mongosync``, see
:ref:`Atlas to Atlas <c2c-conn-atlas2atlas>`,
:ref:`Self-Managed to Self-Managed <c2c-conn-oprem2onprem>`, or
:ref:`Self-Managed to Atlas <c2c-conn-onprem2atlas>`.
