.. procedure::
   :style: normal

   .. step:: Download the latest `MongoDB ODBC Driver <https://www.mongodb.com/try/download/odbc-driver>`__ version from the MongoDB download center.
  
   .. step:: Verify the integrity of the downloaded package.

      The MongoDB release team digitally signs all software packages to
      certify that a particular MongoDB package is a valid and unaltered
      MongoDB release. Complete the following steps to verify the ODBC driver
      binary against its SHA256 key:
  
      a. Download the ``.sha256`` file for Windows x64 from the `MongoDB ODBC Drivers Downloads page <https://translators-connectors-releases.s3.amazonaws.com/mongosql-odbc-driver/windows/{+sql-odbc-version+}/release/mongoodbc.msi.sha256>`__. 
  
      #. Compare the signature file to the MongoDB installer hash using the
         following Powershell script:
    
         .. code-block:: shell
      
            $sigHash = (Get-Content $Env:HomePath\Downloads\mongodbodbc.msi.sha256 | Out-String).    SubString(0,64).ToUpper(); `
            $fileHash = (Get-FileHash $Env:HomePath\Downloads\mongodbodbc.msi).Hash.Trim(); `
            echo $sigHash; echo $fileHash; `
            $sigHash -eq $fileHash
        
         The command outputs three lines:

         - A SHA256 hash that you downloaded directly from MongoDB.
         - A SHA256 hash computed from the MongoDB ODBC driver binary you downloaded from MongoDB.
         - A True or False result depending if the hashes match.
         
         If the hashes match, the MongoDB binary is verified.