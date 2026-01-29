a. Download the latest `MongoDB JDBC Driver <https://www.mongodb.com/try/download/jdbc-driver>`__ version.

#. Verify the integrity of the downloaded package:

   The MongoDB release team digitally signs all software packages to
   certify that a particular MongoDB package is a valid and unaltered
   MongoDB release. MongoDB signs each release branch with a different
   PGP key in ``.asc`` format.  

   i. Run the following command to download the ``.asc`` file from the 
      `Maven Central Repository <https://search.maven.org/artifact/org.mongodb/mongodb-jdbc>`__.
      Replace ``{version-number}`` with the version of the driver you downloaded and ``{artifact_to_verify}`` with the name of the file you downloaded.  

      .. code-block:: sh 

         curl -O https://repo1.maven.org/maven2/org/mongodb/mongodb-jdbc/{version-number}/{artifact_to_verify}.asc
      
      For example, if you downloaded ``mongodb-jdbc-2.2.3-all.jar``, you would run the following command.

      .. code-block:: sh 

         curl -O https://repo1.maven.org/maven2/org/mongodb/mongodb-jdbc/2.2.3/mongodb-jdbc-2.2.3-all.jar.asc

   #. Run the following command to download then import the key file. Replace 
      ``{server_url}`` with one of the current GPG key servers supported by Maven:

      - ``keyserver.ubuntu.com``
      - ``keys.openpgp.org``
      - ``pgp.mit.edu``

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            gpg --keyserver {server_url} --recv-keys BDDC8671F1BE6F4D5464096624A4A8409351E954

         .. output:: 
            :language: shell 

            gpg: key BDDC8671F1BE6F4D5464096624A4A8409351E954: public key "MongoDB JDBC Driver Release Signing Key <packaging@mongodb.com>" imported
            gpg: Total number processed: 1
            gpg:               imported: 1

   #. Run the following command to verify the MongoDB JDBC Driver installation file. Replace ``detached_signature_file`` and ``artifact_to_verify`` with the names of the files you downloaded.

      .. code-block:: 

         gpg --verify {detached_signature_file} {artifact_to_verify}

      For example, if you downloaded ``mongodb-jdbc-2.2.3-all.jar`` and ``mongodb-jdbc-2.2.3-all.jar.asc`` to your current directory, you would run the following. 
      
      .. code-block::
         
         gpg --verify mongodb-jdbc-2.2.3-all.jar.asc mongodb-jdbc-2.2.3-all.jar
      
      GPG should return a response similar to the following:

      .. code-block:: shell
      
         gpg: Signature made Wed May 22 13:24:36 2024 MDT
         gpg:                using RSA key BDDC8671F1BE6F4D5464096624A4A8409351E954
         gpg: Good signature from "MongoDB JDBC Driver Release Signing Key <packaging@mongodb.com>"

      If the package is properly signed, but you don't yet trust
      the signing key in your local ``trustdb``, ``gpg`` will also return
      the following message: 

      .. code-block:: shell 

         gpg: WARNING: This key is not certified with a trusted signature!
         gpg:          There is no indication that the signature belongs to the owner.
         Primary key fingerprint: D2C4 5B7E 66A5 DCA1 8B76  57A8 91A2 1577 3066 6110

      If you receive the following error message, confirm that you
      imported the correct public key: 

      .. code-block:: shell 

         gpg: Can't check signature: public key not found

