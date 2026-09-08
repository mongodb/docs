.. This file is snippet output generated from content/atlas/source/includes/shared/facts/find-connection-string-no-placeholder.rst.
   Do not modify this file. Edit the source file instead.

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

      To learn more, see :manual:`Connection Strings </reference/connection-string/>`.

