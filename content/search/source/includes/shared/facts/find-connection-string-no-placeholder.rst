.. SHARED FILE: This file is a copy of
   content/atlas/source/includes/search-shared/find-connection-string-no-placeholder.rst
   Any changes here must also be applied to the source file.

.. tabs::

   .. tab:: Atlas Cluster
      :tabid: cloud

      .. include:: /includes/shared/facts/fact-connection-string-format-drivers.rst

      To learn more, see :ref:`connect-via-driver`.

   .. tab:: Local or Self-Managed
      :tabid: local

      Your connection string should use the
      following format:

      .. code-block::

         mongodb://localhost:<port-number>/?directConnection=true

      To learn more, see :ref:`Connection Strings <mongodb-uri>`.
