.. list-table::
   :widths: 30 70

   * - :guilabel:`Hostname`

     - The hostname of the machine where the ``mongod`` instance is
       running.

       .. tip::

          Starting with version 1.8.0, MongoDB Compass can detect
          whether you have a MongoDB
          :manual:`URI connection string </reference/connection-string>`
          in your system clipboard and auto-populate the connection
          dialog from the URI. Open MongoDB Compass with a URI
          connection string in your clipboard and click :guilabel:`Yes`
          when prompted to auto-populate the dialog.

   * - :guilabel:`Port`
     - The port on which ``mongod`` is running.

   * - :guilabel:`Authentication`

     - The authentication to use if the ``mongod`` instance
       requires authentication. Select:

       - :guilabel:`Username / Password` if the ``mongod`` instance
         uses either MongoDB-CR or SCRAM-SHA-1 as its
         authentication mechanism.

       - :guilabel:`X.509` if the ``mongod`` instance uses
         X.509 as its authentication mechanism.

         *Not Available in Compass Community Edition*

       - :guilabel:`Kerberos` if the ``mongod`` instance uses
         Kerberos as its authentication mechanism.

         *Not Available in Compass Community Edition*

       - :guilabel:`LDAP` if the ``mongod`` instance uses LDAP as
         its authentication mechanism.

         *Not Available in Compass Community Edition*

       For MongoDB access required, see :ref:`required-access`.

   * - :guilabel:`Replica Set Name`

     - The name of the MongoDB replica set to which you want to connect.

   * - :guilabel:`Read Preference`

     - Specifies how Compass directs read operations. Options are
       ``Primary``, ``Primary Preferred``, ``Secondary``,
       ``Secondary Preferred``, and ``Nearest``. See `Read Preference <https://docs.mongodb.com/manual/core/read-preference/>`_.

   * - :guilabel:`SSH tunnel`

     - Select whether Compass should connect to a MongoDB cluster
       via an SSH tunnel, which automatically starts when you connect
       to MongoDB, and stops when you disconnect. If selected,
       choose either a password or an identity file to provide
       authentication.

       Enter information for the SSH tunnel.

       .. list-table::
          :widths: 35 65

          * - *SSH Hostname*

            - Enter the bastion (jumpbox) hostname. This is the
              unique identifier (Fully Qualified Domain Name, or
              FQDN) for the machine to be accessed.


          * - *SSH Tunnel Port*

            - Provide the port used for the SSH connection. This
              defaults to 22, the standard port for SSH.

          * - *SSH Username*

            - The username of the profile to log into on the remote
              system. This will be the user for which you want to
              establish the SSH connection.

          * - *SSH Identity File*

            - Select the file from which the identity (private key)
              for SSH public key authentication is read.

              Unix or OS X: If using OpenSSH, identity files are
              found in the :file:`~/.ssh` directory. By default,
              the private key files have one of the following file
              names:

              - ``id_dsa``
              - ``id_ecdsa``
              - ``id_ed25519``
              - ``id_rsa``

              On Windows, the location of the identify files
              depends on your choice of SSH client, such as PuTTY.

          * - *SSH Passphrase*

            - If your private key is encrypted, provide the
              passphrase used to decrypt your private key (stored
              in the specified identity file). A passphrase
              provides an extra layer of security for an SSH
              connection.

          * - *SSH Password*
            -  The password used to secure the SSH connection.
               This is required if you are not using an identity file.

       To use an SSH tunnel through a bastion host, the ssh
       configuration on the bastion host must allow TCP port
       forwarding; i.e., the ``AllowTcpForwarding`` directive in
       the :file:`/etc/ssh/sshd_config` file is set to ``yes``. If
       ``AllowTcpForwarding`` is not set to ``yes``, set to ``yes``
       and restart the ssh daemon (``sudo service sshd restart``).

       Instead of creating the SSH tunnel through the Compass UI, you can also create
       the tunnel manually from the command line:

       .. code-block:: sh

          ssh -L <local_port>:<mongodb_hostname>:<mongodb_port> \
             <user>@<bastion_hostname> -fN

       .. example::

          If you have a :binary:`~bin.mongod` instance running on
          (internal) ``hostname-a.com`` on port 27017, and the
          bastion host is ``hostname-b.com`` with user name
          ``ec2-user``, you can build the tunnel via

          .. code-block:: sh

             ssh -L 27000:hostname-a.com:27017 ec2-user@hostname-b.com -fN

          Using this SSH tunnel, you can now connect Compass (or
          the :binary:`~bin.mongo` shell) to ``localhost:27000`` to
          connect to the :binary:`~bin.mongod` instance running on
          ``hostname-a.com``.

       .. note::

          You cannot connect to a :term:`replica set` via an SSH
          tunnel. |compass-short| cannot establish a connection
          to multiple servers across the same SSH tunnel. When you
          select an :guilabel:`SSH Tunnel` option in the connection
          form, |compass-short| hides the :guilabel:`Replica Set Name`
          and :guilabel:`Read Preference` fields in the form.


   * - :guilabel:`Favorite Name`

     - *Optional*. A name for the connection. To save the current
       connection entered as a favorite connection, enter a name
       in the input and click :guilabel:`Create Favorite`. For more
       information on favorite connections, see the
       :ref:`Favorite Connections <favorite-connections>`
       documentation.

       .. note::

          The :guilabel:`Create Favorite` button only appears once
          you have entered text into the :guilabel:`Favorite Name`
          input.

          Although you can save multiple connections with the same
          :guilabel:`Favorite Name`, it is recommended to use
          unique names for each connection to easily find your
          desired connections.
