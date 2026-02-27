.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the :driver:`.NET/C# </csharp>` driver, install version 2.20.0 or later.

   .. step:: For driver versions 3.0 or later, install libmongocrypt {+minimum-libmongocrypt-version+} or later.

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Debian:

      a. Configure the repository

         .. note::

            If you are using the `extrepo <https://packages.debian.org/source/sid/extrepo>`__ 
            repository manager, you can view and enable the ``libmongocrypt``
            repository by running the commands:

            .. code-block:: sh

               extrepo search libmongocrypt
               sudo extrepo enable libmongocrypt
   
         To configure the repository manually:
   
         i. Import the public key used to sign the package repositories:

            .. code-block:: sh

               sudo sh -c 'curl -s --location https://pgp.mongodb.com/libmongocrypt.asc | gpg --dearmor >/etc/apt/trusted.gpg.d/libmongocrypt.gpg'

         #. Add the MongoDB repository to your package sources

            .. important::

               Change ``<release>`` in the following shell command to your platform release (for example "xenial" or "buster").

            .. code-block:: sh

               echo "deb https://libmongocrypt.s3.amazonaws.com/apt/debian <release>/libmongocrypt/{+libmongocrypt-version+} main" | sudo tee /etc/apt/sources.list.d/libmongocrypt.list

      #. Update the package cache

         .. code-block:: sh

            sudo apt-get update


      #. Install ``libmongocrypt``

         .. code-block:: sh

            sudo apt-get install -y libmongocrypt-dev
      
         .. step:: Set the ``LIBMONGOCRYPT_PATH`` environment variable to the absolute path of the ``libmongocrypt`` file.
         
      #. For driver versions 3.0 or later, install the ``MongoDB.Driver.Encryption`` package
      
         Install the `MongoDB.Driver.Encryption <https://www.nuget.org/packages/MongoDB.Driver.Encryption>`__ 
         package from NuGet. This package enables automatic encryption. 

   .. step:: For driver versions 3.4.3 or earlier on 64-bit Linux, add the following XML to your ``.csproj`` file.

      Replace ``<MongoDriverEncryptionVersion>`` with the installed version of
      the ``MongoDB.Driver.Encryption`` package:

      .. code-block:: xml
         :emphasize-lines: 3

         <PropertyGroup>
            <!-- replace the version here with your package version --> 
            <MongoDriverEncryptionVersion>3.4.2</MongoDriverEncryptionVersion>
            <MongoDriverEncryptionPath>$(NuGetPackageRoot)mongodb.driver.encryption\$(MongoDriverEncryptionVersion)</MongoDriverEncryptionPath>
         </PropertyGroup>
         <PropertyGroup>
            <!-- Suppresses the duplicate file error -->
            <ErrorOnDuplicatePublishOutputFiles>false</ErrorOnDuplicatePublishOutputFiles>
         </PropertyGroup>
         <!-- Ensures the correct library after build or publish -->
         <Target Name="EnsureCorrectMongoEncryption" AfterTargets="Build;Publish" Condition="'$(RuntimeIdentifier)' != ''">
            <!-- Determine paths based on current operation -->
            <PropertyGroup>
                  <_TargetDir Condition="Exists('$(PublishDir)')">$(PublishDir)</_TargetDir>
                  <_TargetDir Condition="'$(_TargetDir)' == ''">$(OutputPath)</_TargetDir>
            </PropertyGroup>
            <!-- Copy the correct library based on runtime identifier (RID) -->
            <ItemGroup>
                  <_CorrectMongoLib Include="$(MongoDriverEncryptionPath)/runtimes/linux/native/x64/libmongocrypt.so"
                                    Condition="'$(RuntimeIdentifier)' == 'linux-x64'" />
                  <_CorrectMongoLib Include="$(MongoDriverEncryptionPath)/runtimes/linux/native/arm64/libmongocrypt.so"
                                    Condition="'$(RuntimeIdentifier)' == 'linux-arm64'" />
                  <_CorrectMongoLib Include="$(MongoDriverEncryptionPath)/runtimes/linux/native/alpine/libmongocrypt.so"
                                    Condition="'$(RuntimeIdentifier)' == 'linux-musl-arm64'" />
            </ItemGroup>
            <!-- Copy with overwrite -->
            <Copy SourceFiles="@(_CorrectMongoLib)"
                  DestinationFolder="$(_TargetDir)"
                  Condition="'@(_CorrectMongoLib)' != ''"
                  OverwriteReadOnlyFiles="true" />
            <Message Text="Fixed MongoDB encryption library for $(RuntimeIdentifier)"
                        Condition="'@(_CorrectMongoLib)' != ''" />
         </Target>
   
   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      .. include:: /includes/see-get-started.rst