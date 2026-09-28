The MongoDB |jdbc| driver is required for connecting to your database with Tableau,
DBeaver, DataGrip, and other Java applications that accept a |jdbc| API, such as
a `Maven <https://maven.apache.org/>`__ project.

JDBC Driver Compatibility
~~~~~~~~~~~~~~~~~~~~~~~~~

- The MongoDB |jdbc| driver is compatible with:

  - Windows x86_64

  - macOS x86_64 and macOS aarch64 architectures

  - linux x86_64 and linux arm64 architectures

- OpenSSL 3.0 or greater is required for secure connections.

- You can authenticate with :ref:`SCRAM-SHA-1, SCRAM-SHA-256
  <authentication-scram>`, :ref:`X.509 <security-auth-x509>`,
  :ref:`LDAP <security-ldap>`, :ref:`Kerberos (GSSAPI)
  <security-kerberos>`, :ref:`OpenID Connect <authentication-oidc>`, and
  :ref:`MongoDB Passwordless Authentication with AWS <set-up-pwdless-auth>`.
  To configure X.509, Kerberos, or {+oidc+} for the |jdbc| driver,
  see :ref:`sql-auth-jdbc-config`.

.. note::

   Not every authentication mechanism is supported depending on your
   deployment type. For the mechanisms that each component and
   deployment type supports, see :ref:`sql-authentication`.

Procedure
~~~~~~~~~

.. procedure::
   :style: normal

   .. step:: Download the MongoDB JDBC driver.

      Download the latest |jdbc| driver from the `MongoDB download center <https://www.mongodb.com/try/download/jdbc-driver/>`__.

      .. include:: /includes/fact-jdbc-formats.rst

   .. step:: Move the ``jar`` file to the appropriate directory for your operating system.

      Copy the ``jar`` file to the appropriate directory for your |bi| tool. For example,
      if you're installing the |jdbc| driver for Tableau:

      - **Windows:** ``C:\Program Files\Tableau\Drivers``

      - **macOS:** ``~/Library/Tableau/Drivers``

      - **Linux:** ``/opt/tableau/tableau_driver/jdbc``

   .. step:: Verify the integrity of the downloaded package.

      The MongoDB release team digitally signs all software packages to
      certify that a particular MongoDB package is a valid and unaltered
      MongoDB release. MongoDB signs each release branch with a different
      PGP key in ``.asc`` format.

      a. Run the following command to download the ``.asc`` file from the
         `Maven Central Repository <https://search.maven.org/artifact/org.mongodb/mongodb-jdbc>`__.
         Replace ``<versionNumber>`` with the version of the driver you downloaded and ``<artifactToVerify>`` with the name of the file you downloaded.

         .. code-block:: sh

            curl -O https://repo1.maven.org/maven2/org/mongodb/mongodb-jdbc/<versionNumber>/<artifactToVerify>.asc

         For example, if you downloaded ``mongodb-jdbc-2.2.3-all.jar``, you would run the following command.

         .. code-block:: sh

            curl -O https://repo1.maven.org/maven2/org/mongodb/mongodb-jdbc/2.2.3/mongodb-jdbc-2.2.3-all.jar.asc


      #. Run the following command to download, then import the key file. Replace
         ``<serverUrl>`` with one of the current GPG key servers supported by Maven:

         - ``keyserver.ubuntu.com``
         - ``keys.openpgp.org``
         - ``pgp.mit.edu``

         .. io-code-block::
            :copyable: true

            .. input::
               :language: shell

               gpg --keyserver <serverUrl> --recv-keys BDDC8671F1BE6F4D5464096624A4A8409351E954

            .. output::
               :language: shell

               gpg: key BDDC8671F1BE6F4D5464096624A4A8409351E954: public key "MongoDB JDBC Driver Release Signing Key <packaging@mongodb.com>" imported
               gpg: Total number processed: 1
               gpg:               imported: 1

      #. Run the following command to verify the MongoDB |jdbc| driver installation file. Replace ``<detachedSignatureFile>`` and ``<artifactToVerify>`` with the names of the files you downloaded.

         .. code-block::

            gpg --verify <detachedSignatureFile> <artifactToVerify>

         For example, if you downloaded ``mongodb-jdbc-2.2.3-all.jar`` and ``mongodb-jdbc-2.2.3-all.jar.asc`` to your current directory, you would run the following.

         .. code-block::

            gpg --verify mongodb-jdbc-2.2.3-all.jar.asc mongodb-jdbc-2.2.3-all.jar

         GPG should return a response similar to the following:

         .. code-block:: shell

            gpg: Signature made Wed May 22 13:24:36 2024 MDT
            gpg:                using RSA key BDDC8671F1BE6F4D5464096624A4A8409351E954
            gpg: Good signature from "MongoDB JDBC Driver Release Signing Key <packaging@mongodb.com>"

         If the package is properly signed, but you don't yet trust
         the signing key in your local ``trustdb``, ``gpg`` also returns
         the following message:

         .. code-block:: shell

            gpg: WARNING: This key is not certified with a trusted signature!
            gpg:          There is no indication that the signature belongs to the owner.
            Primary key fingerprint: D2C4 5B7E 66A5 DCA1 8B76  57A8 91A2 1577 3066 6110

         If you receive the following error message, confirm that you
         imported the correct public key:

         .. code-block:: shell

            gpg: Can't check signature: public key not found

Integrate with a Maven Project
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can connect the MongoDB |jdbc| driver with your Maven
application.

.. procedure::
   :style: normal

   .. include:: /includes/step-jdbc-maven-configure-driver.rst

   .. include:: /includes/step-jdbc-maven-add-dependency.rst
