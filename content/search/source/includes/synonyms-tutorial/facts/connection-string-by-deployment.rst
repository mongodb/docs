.. selected-content::
   :selections: atlas

   Replace ``<connection-string>`` with the connection string for your
   |service| cluster.

   .. include:: /includes/shared/facts/fact-connection-string-format-drivers.rst

   To learn more, see :ref:`connect-via-driver`.

.. selected-content::
   :selections: local-onprem

   Replace ``<connection-string>`` with the connection string for your
   local or self-managed deployment. Your connection string should use
   the following format:

   .. code-block::

      mongodb://localhost:<port-number>/?directConnection=true

   To learn more, see :ref:`Connection Strings <mongodb-uri>`.
