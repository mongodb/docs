
To configure the repository, use a text editor to copy the repository
information into the ``/etc/yum.repos.d/mongodb-org-{+version+}.repo``
file:

.. tabs::

   .. tab:: RHEL 10
      :tabid: rhel10

      .. include:: /includes/deploy/code/community-rhel10-conf

   .. tab:: RHEL 9
      :tabid: rhel9

      .. include:: /includes/deploy/code/community-rhel9-conf

   .. tab:: RHEL 8
      :tabid: rhel8

      .. include:: /includes/deploy/code/community-rhel8-conf

Use the repository information for your version of Red Hat Enterprise
Linux or for the version of RHEL that corresponds to your distribution
release. For example, use the RHEL 10 information for Rocky Linux 10.

.. note::

   Alternatively, you can download the ``.rpm`` files directly
   from the `MongoDB repository <https://repo.mongodb.org/yum/redhat/>`_.
   Downloads are organized by Red Hat / CentOS version (e.g. ``9``),
   then MongoDB :ref:`release version <release-version-numbers>`
   (e.g. ``{+version+}``), then architecture (e.g. ``x86_64``).

