.. procedure::
   :style: normal

   .. step:: Copy the data in the {+az-bs+} container using the ``azcopy`` CLI and extract the data.

      .. code-block:: shell

	 azcopy copy "https://<storageAccountName>.blob.core.windows.net/<containerName>/<prefix>/*" "<downloadFolder>" --recursive
	 
      where: 

      .. list-table:: 
	 :widths: 30 70 

         * - ``<storageAccountName>``
	   - Name of the |azure| account to which the blob storage
	     container belongs.
		  
	 * - ``<containerName>`` 
	   - Name of the |azure| blob storage container.

	 * - ``<prefix>``
	   - Path to archived data in the bucket.

	 * - ``<downloadFolder>``
	   - Path to the local folder where you want to copy the archived 
	     data.

      .. example:: 

	 .. code-block:: shell 
	    :copyable: false

	    azcopy copy	"https://mystorageaccount.blob.core.windows.net/mycontainer/myTextFile.txt" "~/downloads" --recursive
	    
   .. step:: Copy and store the following script in a file named ``massimport.sh``.

      .. code-block:: shell 

	 #!/bin/bash

	 regex='/(.+)/(.+)/.+'
	 dir=${1%/}
	 connstr=$2

	 # iterate through the subdirectories of the downloaded and
	 # extracted snapshot export and restore the docs with mongoimport
	 find $dir -type f -not -path '*/\.*' -not -path '*metadata\.json' | while read line ; do
	   [[ $line =~ $regex ]]
	   db_name=${BASH_REMATCH[1]}
	   col_name=${BASH_REMATCH[2]}
	   mongoimport --uri "$connstr" --mode=upsert -d $db_name -c $col_name --file $line --type json
	 done

	 # create the required directory structure and copy/rename files
	 # as needed for mongorestore to rebuild indexes on the collections
	 # from exported snapshot metadata files and feed them to mongorestore
	 find $dir -type f -name '*metadata\.json' | while read line ; do
	   [[ $line =~ $regex ]]
	   db_name=${BASH_REMATCH[1]}
	   col_name=${BASH_REMATCH[2]}
	   mkdir -p ${dir}/metadata/${db_name}/
	   cp $line ${dir}/metadata/${db_name}/${col_name}.metadata.json
	 done
	 mongorestore "$connstr" ${dir}/metadata/

	 # remove the metadata directory because we do not need it anymore and this returns
	 # the snapshot directory in an identical state as it was prior to the import
	 rm -rf ${dir}/metadata/

      Here: 

      - ``--mode=upsert`` enables |mongoimport| to handle duplicate 
	documents from an archive. 
      - ``--uri`` specifies the connection string for the |service| cluster.	     

   .. step:: Run the ``massimport.sh`` utility to import the archived data into the {+service+} cluster.

      .. code-block:: shell 

	 sh massimport.sh <downloadFolder> "mongodb+srv://<connectionString>"

      where: 

      .. list-table:: 
	 :widths: 30 70 

	 * - ``<downloadFolder>``
	   - Path to the local folder where you copied the archived data.

	 * - ``<connectionString>``
	   - Connection string for the |service| cluster.

      .. example:: 

	 .. code-block:: shell 
	    :copyable: false

	    sh massimport.sh "~/downloads" "mongodb+srv://<myConnString>"
