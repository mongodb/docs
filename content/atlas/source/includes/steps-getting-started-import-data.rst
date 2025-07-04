.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Choose :guilabel:`Command Line Tools` for your desired cluster.
    
      From the :icon-fa5:`ellipsis-h` menu for the cluster, click
      :guilabel:`Command Line Tools`.
      
   .. step:: Retrieve and modify the ``mongoimport`` connection template.
    
      The :guilabel:`Data Import and Export Tools` section of the
      :guilabel:`Command Line Tools` tab displays a copyable template with
      the minimum required options for connecting ``mongoimport`` to your
      |service| cluster.
      
      The template includes placeholder values for certain options. Copy
      and paste the template into your preferred text editor and make the
      following modifications:
      
      .. list-table::
         :widths: 20 80
         :header-rows: 1
         :stub-columns: 1
      
         * - Variable
           - Description
      
         * - ``<USERNAME>`` and ``<PASSWORD>``
           - Replace with the password for the user specified in
             ``--username``. The template includes a database user for the
             project as the ``--username``. If you want to authenticate as
             a different user, replace the value of ``--username`` and
             specify the password for that user in ``--password``.
      
         * - ``<DATABASE>``
           - Replace with ``guidebook``
      
         * - ``<COLLECTION>``
           - Replace with ``restaurants``
      
         * - ``<FILETYPE>``
           - Replace with ``json``
      
         * - ``<FILENAME>``
           - Replace with the path to ``primer-dataset.json``.
      
      Your command should resemble the following:
      
      .. code-block:: shell
      
         mongoimport \
           --host example/00.example.net:27017,01.example.net:27017,02.example.net:27017 \
           --ssl --username <USERNAME> --password <PASSWORD> \
           --authenticationDatabase admin \
           --db guidebook --collection restaurants \
           --type json
      
   .. step:: Load the primer dataset.
      
      To load the dataset, you can either:
      
      Download, then Import:
        You can download the dataset from
        `GitHub <https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json>`__.
      
        .. code-block:: shell
      
            wget https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json
      
        Run ``mongoimport`` in the shell on the downloaded file.
      
        .. code-block:: shell
      
            mongoimport --host RKDevTest-shard-0/rkdevtest-shard-00-00-zax0p.mongodb-dev.net:27017,rkdevtest-shard-00-01-zax0p.mongodb-dev.net:27017,rkdevtest-shard-00-02-zax0p.mongodb-dev.net:27017 \
              --ssl --username <USERNAME> --password <PASSWORD> \
              --authenticationDatabase admin --db guidebook \
              --collection restaurants --type json \
              --file primer-dataset.json
      
      Download and import:
        Download and import the dataset as one command in your shell:
      
        .. code-block:: shell
      
           wget -q -O- https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json | \
           mongoimport --host RKDevTest-shard-0/rkdevtest-shard-00-00-zax0p.mongodb-dev.net:27017,rkdevtest-shard-00-01-zax0p.mongodb-dev.net:27017,rkdevtest-shard-00-02-zax0p.mongodb-dev.net:27017 \
             --ssl --username <USERNAME> --password <PASSWORD> \
             --authenticationDatabase admin --db guidebook \
             --collection restaurants --type json
      
        Omit the ``--file`` option when using this method.
      
      .. important::
      
         Ensure that the host where you are running |mongoimport|
         is in the project :ref:`IP access list <security-ip-access-list>`.
      
         To review your project IP access list, click :guilabel:`Network
         Access` in the :guilabel:`Security` section of the left
         navigation. The :guilabel:`IP Access List` tab displays. For
         complete documentation on managing your project IP access list,
         see :ref:`security-ip-access-list`.
