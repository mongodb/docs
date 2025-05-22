
Create an
``/etc/yum.repos.d/mongodb-enterprise-{+version+}.repo`` file so
that you can install MongoDB Enterprise directly using ``yum``:

.. tabs::

   .. tab:: 8
      :tabid: rhel8

      .. include:: /includes/deploy/code/enterprise-rhel8-conf

   .. tab:: 7
      :tabid: rhel7

      .. include:: /includes/deploy/code/enterprise-rhel7-conf


.. note::

   If you have a ``mongodb-enterprise.repo`` file
   in this directory from a previous installation of MongoDB, you
   should remove it. Use the ``mongodb-enterprise-{+version+}.repo``
   file above to install MongoDB {+version+}.

You can also download the ``.rpm`` files directly from the
`MongoDB repository <https://repo.mongodb.com/yum/redhat/>`_.
Downloads are organized by Red Hat / CentOS
version (e.g. ``9``), then MongoDB
:ref:`release version <release-version-numbers>`
(e.g. ``{+version+}``), then architecture (e.g. ``x86_64``).

.. include:: /includes/5.0-changes/fact-odd-number-releases.rst

