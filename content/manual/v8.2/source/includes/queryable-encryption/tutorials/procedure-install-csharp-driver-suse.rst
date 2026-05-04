.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the :driver:`.NET/C# </csharp>` driver, install version 2.20.0 or later.

   .. step:: For driver versions 3.0 or later, install libmongocrypt {+minimum-libmongocrypt-version+} or later.

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Suse:

      a. Import the public key used to sign the package repositories

         .. code-block:: sh

            sudo rpm --import https://pgp.mongodb.com/libmongocrypt.asc

      #. Add the repository to your package sources

         .. important::

            Change ``<release>`` in the following shell command to your platform release (e.g. "12" or "15").

         .. code-block:: sh

            sudo zypper addrepo --gpgcheck "https://libmongocrypt.s3.amazonaws.com/zypper/suse/<release>/libmongocrypt/{+libmongocrypt-version+}/x86_64" libmongocrypt

      #. Install the ``libmongocrypt`` package

         .. code-block:: sh

            sudo zypper -n install libmongocrypt
      
      #. Set the ``LIBMONGOCRYPT_PATH`` environment variable to the absolute path of the ``libmongocrypt`` file.
         
   .. step:: For driver versions 3.0 or later, install the ``MongoDB.Driver.Encryption`` package
      
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