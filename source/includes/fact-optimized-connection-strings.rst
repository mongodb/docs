.. include:: /includes/fact-optimized-connection-strings-intro.rst

To use an optimized connection string, you must meet all of the following criteria:

- :ref:`Configure a sharded {+cluster+} <cluster-option-sharding>`.
- Ensure that the sharded {+cluster+} runs on |aws|. 
- Ensure that the sharded {+cluster+} runs MongoDB version 5.0 or
  later. If your {+cluster+} currently runs an earlier version of
  MongoDB, :ref:`upgrade your {+cluster+}'s MongoDB version
  <upgrade-major-MongoDB-version>` to version 5.0 or later to use an
  optimized |srv| connection string.
- :ref:`Set up a private endpoint <cluster-private-endpoint>` for your
  {+cluster+}.
- Use either:

  - A single-region {+cluster+} or 
  - A multi-region {+cluster+} with :ref:`regionalized private endpoints
    <atlas_regionalized-pl>` enabled. Only the |aws| regions in a 
    multi-region {+cluster+} support an optimized |srv| connection string.
    
  |service| doesn't support
  optimized connections to multi-region {+clusters+} using a single |srv| record.

- Connect using one of the following methods:

  - Connect using a driver that meets or exceeds the 
    :ref:`minimum driver version for optimized connections
    <driver-version-opt-connection>`.
  - :ref:`Connect using Compass <atlas-connect-via-compass>`.
  - :ref:`Connect using mongosh <connect-mongo-shell>`.

.. note::

   If your {+cluster+} meets the criteria for optimized |srv| strings,
   |service| generates an
   :guilabel:`Optimized SRV Connection` string for you. If your cluster ever had legacy connection strings, |service| maintains those strings indefinitely and includes a 
   :guilabel:`Legacy SRV Connection` string when you select the 
   :guilabel:`Private Endpoint` connection type. Consider switching to
   the :guilabel:`Optimized SRV Connection` for optimal performance and
   update your connection string wherever you use it.
   
   If you create the {+cluster+} and enable private endpoints after 
   |service| released this feature, |service| displays the optimized
   connection string by default when you select the 
   :guilabel:`Private Endpoint` connection type. You can identify an
   optimized connection string by the addition of ``lb`` to the
   connection string as shown in the following example:

   ``mongodb+SRV://User1:P@ssword@cluster0-pl-0-lb.oq123.mongodb-dev.net/``

   To disable optimized connection strings for {+clusters+} that don't
   have the :guilabel:`Legacy SRV Connection` option,
   :ref:`contact support <request-support>`.

.. warning:: Converting to a Multi-Region Cluster

   If you convert your single-region sharded cluster to a multi-region
   cluster without enabling regionalized private endpoints, you cannot continue
   to use the optimized connection string. Before converting your cluster, update
   your connection string to the :guilabel:`Legacy SRV Connection` string
   described in the preceding note.

Use Optimized Connection Strings with a Driver
``````````````````````````````````````````````

To learn how to connect using a driver and an optimized connection
string, select the :guilabel:`Private Endpoint Connection` tab in the 
`Connect Your Application procedure 
<https://www.mongodb.com/docs/atlas/driver-connection/#choose-your-connection-security>`__.

Use Optimized Connection Strings with Compass
`````````````````````````````````````````````

To learn how to connect using Compass and an optimized connection
string, select the :guilabel:`Private Endpoint Connection` tab in the 
`Connect to your {+Database-Deployment+} procedure 
<https://www.mongodb.com/docs/atlas/compass-connection/#choose-your-connection-security>`__.

Use Optimized Connection Strings with ``mongosh``
`````````````````````````````````````````````````

To learn how to connect using ``mongosh`` and an optimized connection
string, select the :guilabel:`Private Endpoint Connection` tab in the 
`Connect to your {+Database-Deployment+} procedure 
<https://www.mongodb.com/docs/atlas/mongo-shell-connection/#choose-your-connection-security>`__.