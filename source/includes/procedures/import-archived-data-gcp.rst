.. procedure::
   :style: normal

   .. step:: Copy the data in the {+gcs+} bucket using the ``gcloud``
      CLI and extract the data.

      .. code-block:: shell

	 gsutil -m cp -r "gs://<bucketName>/<prefix> <downloadFolder>" --recursive
	 gunzip -r <downloadFolder>
	 
      where: 

      .. list-table:: 
	 :widths: 30 70 

	 * - ``<bucketName>`` 
	   - Name of the {+gcp+} bucket.

	 * - ``<prefix>``
	   - Path to archived data in the bucket. The path has the 
	     following format:

	     .. code-block:: shell 
		:copyable: false 

		/exported_snapshots/<orgId>/<projectId>/<clusterName>/<initiationDateOfSnapshot>/<timestamp>/

	 * - ``<downloadFolder>``
	   - Path to the local folder where you want to copy the archived 
	     data.

      .. example:: 

	 .. code-block:: shell 
	    :copyable: false

	    gsutil -m cp -r
	    gs://export-test-bucket/exported_snapshots/1ab2cdef3a5e5a6c3bd12de4/12ab3456c7d89d786feba4e7/myCluster/2021-04-24T0013/1619224539
	    mybucket --recursive
	    gunzip -r mybucket

	    
   .. step:: Copy and store the following script in a file named
      ``massimport.sh``.

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

   .. step:: Run the ``massimport.sh`` utility to import the archived
      data into the {+service+} cluster.

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

	    sh massimport.sh mybucket "mongodb+srv://<myConnString>"
