.. Install MongoDB Community on RHEL

.. procedure::
   :style: normal

   .. step:: Configure the repository.

      .. include:: /includes/deploy/community-rhel-conf

   .. step:: Install MongoDB Community Server.

      .. include:: /includes/deploy/community-rhel-install

   .. step:: Configure SELinux.

      Optional. If you plan to run MongoDB |edition| with the default
      port and data directory configuration, you can use the official
      MongoDB policy to configure SELinux to enforce mandatory access
      controls on the ``mongod`` instance.

      For details, see :ref:`manual-selinux`.

