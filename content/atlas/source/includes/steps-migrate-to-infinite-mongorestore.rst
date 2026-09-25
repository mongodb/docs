.. procedure::
   :style: normal

   .. step:: Set up a database user in the source deployment.

      If the source deployment enforces authentication, |mongodump| must
      authenticate as a database user that can read every database you
      migrate. The :authrole:`backup` role on the ``admin`` database
      grants these privileges.

      If no such user exists in your source deployment, create one. To
      learn how to create and manage database users, see the following
      page for your deployment type:

      - For |service|-managed clusters, see :ref:`mongodb-users`.
      - For self-managed deployments, see :ref:`manage-users-and-roles`.

   .. step:: Set up a database user in the destination {+atlas-infinite-cluster+}.

      |mongorestore| must authenticate as a database user that
      can write to every database you migrate. The :atlasrole:`Atlas admin`
      role on the destination {+atlas-infinite-cluster+} grants these
      privileges.

      If no such user exists in your destination
      {+atlas-infinite-cluster+}, create one. To learn how to create and
      manage database users in |service|, see :ref:`mongodb-users`.

   .. step:: Grant your host network access to the source and destination deployments.

      Ensure that the host where you run |mongodump| and |mongorestore|
      can reach both deployments:

      - Add the host to the IP access list for the project that contains
        your destination {+atlas-infinite-cluster+}. To learn how to add
        a host to an IP access list, see :ref:`access-list`.

      - If your source deployment is an {+atlas-core-cluster+} in a
        different project, add the host to that project's IP access
        list as well. If your source deployment is self-managed,
        configure its firewall to accept connections from the host. To
        learn more, see :manual:`Network and Configuration Hardening
        </core/security-hardening/>`.

      If you set up |vpc| peering, you can add the peer's |vpc| |cidr|
      block or a subnet, or the peer |vpc|\'s security group to the IP
      access list. To learn more, see :ref:`security-ip-access-list`.

   .. step:: Run ``mongodump``.

      a. Assemble the ``mongodump`` command.

         The following ``mongodump`` command template connects to a source
         replica set or standalone cluster using its connection string, and
         outputs an archive of the dump to a file.

         Copy the template into your preferred text editor and replace the
         ``<connectionString>`` placeholder with the connection string
         for your source deployment, and ``<fileName>`` with the name of
         the archive file to create.

         .. code-block:: shell

            mongodump --uri "<connectionString>" --archive=<fileName>.archive

         To learn how to construct a connection string for your source
         deployment, see :ref:`mongodb-uri`.

         .. include:: /includes/admonitions/notes/note-ubuntu-dns-error.rst

      #. Run the completed command from a terminal or command prompt on
         a host that has network access to your source deployment.

         .. example::

            The following ``mongodump`` command connects to a source
            {+atlas-core-cluster+} using an SRV connection string, which
            contains the username (``mySourceUsername``) and password
            (``mySourcePassword``) for a database user with the
            ``backup`` role on the ``admin`` database. The command
            outputs an archive of the dump to a file named
            ``mongodump.archive`` in the current working directory.

            .. code-block:: shell
               :copyable: false

               mongodump --uri "mongodb+srv://mySourceUsername:mySourcePassword@cluster0.example.mongodb.net" \
                         --archive="mongodump.archive"

   .. step:: Run ``mongorestore``.

      a. Assemble the ``mongorestore`` command.

         The following ``mongorestore`` command template connects to
         your destination {+atlas-infinite-cluster+} using its
         connection string and restores the archive created by
         |mongodump|. It uses ``--nsExclude`` to exclude the ``admin``
         and ``config`` databases, which |service| manages.

         Copy the template into your preferred text editor and replace
         the following placeholders with the appropriate values:

         - ``<connectionString>``: replace this with the SRV connection
           string for your destination {+atlas-infinite-cluster+}. To
           retrieve or construct a connection string for your
           destination cluster, see :ref:`mongodb-uri`.

           Include the username and password for a database user with
           the :atlasrole:`Atlas admin` role in the connection string.

         - ``<filePath>``: replace this with the path to the archive
           file created by |mongodump|.

         .. note::

            .. include:: /includes/admonitions/notes/percent-encode-uri.rst

         .. code-block:: shell

            mongorestore --uri "<connectionString>" \
                         --archive="<filePath>" \
                         --nsExclude "admin.*" \
                         --nsExclude "config.*"

      #. Run the completed command from a terminal or command prompt on
         a host that has access to the archive file created by
         |mongodump|.

         .. example::

            The following ``mongorestore`` command connects to an
            {+atlas-infinite-cluster+} using an SRV connection string,
            which contains the username (``myDestinationUsername``) and
            password (``myDestinationPassword``) for a database user
            with the :atlasrole:`Atlas admin` role. The command restores
            the archive at ``mongodump.archive`` created by |mongodump|,
            excluding the ``admin`` and ``config`` databases.

            .. code-block:: shell
               :copyable: false

               mongorestore --uri "mongodb+srv://myDestinationUsername:myDestinationPassword@cluster0.example.mongodb.net" \
                         --archive="mongodump.archive" \
                         --nsExclude "admin.*" \
                         --nsExclude "config.*"

   .. step:: Verify the migration.

      After the migration is complete, connect to your
      {+atlas-infinite-cluster+} and verify that the data has been
      migrated successfully. You can run queries to check the presence
      of your collections and documents in the destination cluster.

   .. step:: Update your applications to point to the {+atlas-infinite-cluster+}.

      After verifying the migration, update your applications to connect
      to the {+atlas-infinite-cluster+} instead of the source
      deployment. Ensure that you use the correct connection string and
      credentials for the {+atlas-infinite-cluster+}.