Create a ``/etc/yum.repos.d/mongodb-org-{+version+}.repo`` file
so that you can install MongoDB directly using ``yum``:

.. tabs::

   .. tab:: 8
      :tabid: rhel8

      .. include:: /includes/deploy/code/community-rhel8-conf

   .. tab:: 7
      :tabid: rhel7

      .. include:: /includes/deploy/code/community-rhel7-conf

You can also download the ``.rpm`` files directly from the
`MongoDB repository <https://repo.mongodb.org/yum/redhat/>`_.
Downloads are organized by Red Hat / CentOS version (e.g.
``9``), then MongoDB :ref:`release version
<release-version-numbers>` (e.g. ``{+version+}``), then
architecture (e.g. ``x86_64``).

.. include:: /includes/5.0-changes/fact-odd-number-releases.rst
 
