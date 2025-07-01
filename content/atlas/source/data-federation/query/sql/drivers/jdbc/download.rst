.. procedure::
   :style: normal

   .. step:: Download the latest `MongoDB JDBC Driver <https://www.mongodb.com/try/download/jdbc-driver>`__ version.

   .. step:: Verify the integrity of the downloaded package:

      The MongoDB release team digitally signs all software packages to
      certify that a particular MongoDB package is a valid and unaltered
      MongoDB release. MongoDB signs each release branch with a different
      PGP key in ``.asc`` format.  

      a. Run the following command to download the ``.asc`` file from the 
         `Maven Central Repository <https://search.maven.org/artifact/org.mongodb/mongodb-jdbc>`__.

         .. code-block:: sh 

            curl -O https://repo1.maven.org/maven2/org/mongodb/mongodb-jdbc/2.1.2/mongodb-jdbc-2.1.2.jar.asc

      #. Run the following command to download then import the key file. Replace 
         ``{server_url}`` with one of the current GPG key servers supported by Maven:

         - ``keyserver.ubuntu.com``
         - ``keys.openpgp.org``
         - ``pgp.mit.edu``

         .. io-code-block::
            :copyable: true 

            .. input:: 
               :language: shell 

               gpg --keyserver {server_url} --recv-keys 91A2157730666110

            .. output:: 
               :language: shell 

               gpg: key 91A2157730666110: public key "Huan Li <huan.li@10gen.com>" imported
               gpg: Total number processed: 1
               gpg:               imported: 1

      #. Run the following command to verify the MongoDB JDBC Driver installation file.

         .. code-block:: 

            gpg --verify mongodb-jdbc-2.1.2.jar.asc mongodb-jdbc-2.1.2.jar

         GPG should return a response similar to the following:

         .. code-block:: shell

            gpg: Signature made Wed May 22 13:24:36 2024 MDT
            gpg:                using RSA key 91A2157730666110
            gpg: Good signature from "Huan Li <huan.li@10gen.com>"

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