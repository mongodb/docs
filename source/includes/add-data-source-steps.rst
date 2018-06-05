Add the Data Collection as a Data Source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that the data is in the desired collection, add the collection as a
:doc:`data source </data-sources>` in |charts|. Adding a
collection as a data source links the collection to |charts-short| and
allows us to create visualizations using that data.

.. note::

   Before completing this procedure, ensure that you have allowed your
   Atlas cluster to
   `accept connections <https://docs.atlas.mongodb.com/security-whitelist/>`_
   from |charts|.

1. Click the :guilabel:`Data Sources` tab.

#. Click :guilabel:`New Data Source`.

#. In the :guilabel:`New Data Source` dialog, enter the
   :manual:`connection string </reference/connection-string/index.html>`
   which points to the cluster containing the imported data.

   .. example::

      The following connection string points to an Atlas cluster called
      ``jefftestcluster`` and authenticates a user named ``admin`` on
      the ``admin`` database.

      .. code-block:: none

         mongodb://admin:<password>@jefftestcluster-shard-00-00-bfkni.mongodb.net:27017,jefftestcluster-shard-00-01-bfkni.mongodb.net:27017,jefftestcluster-shard-00-02-bfkni.mongodb.net:27017/test?ssl=true&replicaSet=JeffTestCluster-shard-0&authSource=admin

      For further instructions on determining your Atlas connection
      string, see the
      `Connect Your Application <https://docs.atlas.mongodb.com/driver-connection/#connect-your-application>`_
      Atlas documentation.

   .. important::

      |charts| cannot accept connection strings in
      :manual:`DNS seedlist format
      </reference/connection-string/index.html#dns-seedlist-connection-format>`.
      This means when copying your connection string in Atlas, use the
      string which applies to versions prior to driver version 3.6.

#. Click :guilabel:`Connect`.

#. Select the |dataset| collection.

#. Click :guilabel:`Set Permissions`.

   Leave the permissions as the default :guilabel:`Open Access` option.
   For more information on user permissions in |charts-short|, see
   :ref:`permissions <permission-model>`.

#. Click :guilabel:`Publish Data Source`.
