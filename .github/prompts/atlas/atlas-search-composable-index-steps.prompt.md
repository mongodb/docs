You are a writing assistant that will populate multiple files with some text that corresponds to the method type.

Guidelines:
- Replace the `<field-type>` placeholder with the specified field type name.
- DO NOT hallucinate or add any additional content. 

For each file:
- Add the following text according to corresponding method type. Each file has `/<field-type>/steps-create-index-<method-type>.rst` as its format.
- Create any new files that are referenced that do not already exist in the `/source/includes/fts/field-types/<field-type>/` directory. These are the files that follow `literalinclude::`. Leave the files blank.

For the steps-create-index-admin-api file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Retrieve your Service Account access token for the project. 

      Use your service account to generate an access token, which 
      authenticates your requests to the {+atlas-admin-api+}
      To learn how to generate an access token, see 
      :ref:`example-api-request`.  

   .. step:: Make an |api| call.

      Replace the following values in the ``curl`` command below. This 
      command sends a ``POST`` request to your |service| cluster to 
      create an |fts| index with the |fts-field-type| field type.

      - Replace {``ACCESS-TOKEN``} with the output from the preceding step
      - Replace {``groupID``} with the project ID of the project where 
        you want to create the |fts| index 
      - Replace {``clusterName``} with the name of the cluster where 
        you want to create the |fts| index

      .. literalinclude:: /includes/fts/field-types/<field_type>/create_index_api.sh
         :language: shell
         :copyable: true
         :linenos:

For the steps-create-index-atlas-cli file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Create a ``search-index.json`` configuration file and specify the ``<field-type>`` type.

      .. literalinclude:: /includes/fts/field-types/<field-type>/search-index-cli.json
         :language: json
         :linenos:
         :caption: search-index.json
         :copyable: true
   
   .. step:: Connect to the {+atlas-cli+} 

      In your terminal, connect to your |service| cluster from the 
      {+atlas-cli+}. To learn more, see 
      :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: Create an |fts| index.

      Run the :atlascli:`atlas clusters indexes create </command/atlas-clusters-indexes-create/>`
      command in your terminal, replacing ``<clusterName>`` with the 
      name of the cluster, and ``<path-to-file>`` with the 
      path to the ``search-index.json`` file:
      
      .. literalinclude:: /includes/fts/field-types/<field-type>/create-index-cli.sh
         :language: shell
         :copyable: true

For the steps-create-index-atlas-cli-local file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Create a ``search-index.json`` configuration file and specify the ``<field-type>`` type.

      .. literalinclude:: /includes/fts/field-types/<field-type>/search-index-cli.json
         :language: json
         :linenos:
         :caption: search-index.json
         :copyable: true
   
   .. step:: Connect to the {+atlas-cli+} 

      In your terminal, connect to your local deployment from the 
      {+atlas-cli+}. To learn more, see 
      :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: Create an |fts| index.

      Run the :atlascli:`atlas deployments indexes create </command/atlas-deployments-search-indexes-create/>`
      command in your terminal, replacing ``<path-to-file>`` with the 
      path to the ``search-index.json`` file: 
      
      .. literalinclude:: /includes/fts/field-types/<field-type>/create-index-cli-local.sh
         :language: shell
         :copyable: true


For the steps-create-index-atlas-ui file:

Define the Index for the |fts-field-type| Type  
----------------------------------------------

Choose your preferred configuration method in the {+atlas-ui+} and then select the database and collection.

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      .. include:: /includes/fts/extracts/fts-vib-index-definition-advanced.rst 

   .. tab:: JSON Editor 
      :tabid: jsonib

      .. include:: /includes/fts/extracts/fts-jsonib-index-definition.rst   

      .. code-block:: json 

         <index-definition>

For the steps-create-index-c file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Set up the C project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` for this project: 

      .. literalinclude:: /includes/fts/field-types/initialize-project-c.sh
         :language: shell
         :linenos:
         :copyable: true

      Add the C driver to your project by following the instructions in the 
      `MongoDB C Driver documentation <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/>`__.

   .. step:: Define the index.

      Create a ``create_index.c`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/field-types/<field-type>/create_index.c
         :caption: create_index.c
         :language: c
         :linenos:
         :copyable:

      .. include:: /includes/fts/field-types/find-connection-string.rst

   .. step:: Set up a CMake application

      To configure your application, create a ``CMakeLists.txt`` file in
      your project directory. Then, add the following code to the file:

      .. literalinclude:: /includes/fts/field-types/initialize-cmake-c.txt
         :caption: CMakeLists.txt
         :language: txt
         :linenos:
         :copyable:

      The preceding code performs the following actions:
      
      - Configures a C project.
      - Creates a ``index.out`` executable for your application.
      - Finds and requires the C driver. Replace the ``<version>``
        placeholder with your C driver version <field-type>, such as ``2.0.0``.
      - Links the program to the ``libmongoc`` library.

      .. note::

         In the sample ``CMakeLists.txt`` file, the ``mongoc::mongoc`` target
         points to either the static library or the shared library.
         The library type depends on which one is available and
         whichever type the user specifies in the ``MONGOC_DEFAULT_IMPORTED_LIBRARY_TYPE``
         CMake configuration setting. If you don't set this value and
         both library types are available, ``mongoc::mongoc`` uses
         the static library.

         You can use the ``mongoc::static`` target to explicitly use the 
         static library or the ``mongoc::shared`` target to use the shared
         library.

   .. step:: Create the index.

      In your terminal, run the following commands to build and run this 
      application: 
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cmake -S. -Bcmake-build
            cmake --build cmake-build --target index.out
            ./cmake-build/index.out

         .. output::

            Index created!

For the steps-create-index-cpp file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Set up the C++ project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` for this project: 

      .. literalinclude:: /includes/fts/field-types/initialize-project-cpp.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the
      `MongoDB C++ Driver documentation <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/get-started/>`__.

   .. step:: Define the index.

      Create a ``CreateIndex.cpp`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/field-types/<field-type>/CreateIndex.cpp
         :caption: CreateIndex.cpp
         :language: cpp
         :linenos:
         :copyable:

      .. include:: /includes/fts/field-types/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            c++ --std=c++17 CreateIndex.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

         .. output::
            :visible: false

            New index name: default
      
      .. tip:: MacOS Error
         
         MacOS users might see the following error after running the preceding 
         commands:

         .. code-block:: sh
         
            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib

         To resolve this error, use the ``-Wl``,``-rpath`` linker option to set 
         the ``@rpath``, as shown in the following code:

         .. code-block:: sh
         
            c++ --std=c++17 CreateIndex.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

For the steps-create-index-csharp file:

Define the Index for the |fts-field-type| Type  
----------------------------------------------

.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 

      .. literalinclude:: /includes/fts/field-types/initialize-project-csharp.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the 
      :ref:`MongoDB C# Driver documentation <csharp-quickstart>`.
   
   .. step:: Define the index.
   
      Paste the following code into the ``Program.cs`` file.

      .. literalinclude:: /includes/fts/field-types/<field-type>/CreateIndex.cs
         :caption: Program.cs
         :language: csharp
         :linenos:
         :copyable:

      .. include:: /includes/fts/field-types/find-connection-string.rst
   
   .. step:: Create the index.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::
            :visible: false

            New index name: default

For the steps-create-index-go file:

Define the Index for the |fts-field-type| Type  
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Set up and initialize the Go module.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 
      
      .. literalinclude:: /includes/fts/field-types/initialize-project-go.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <golang-quickstart>`.

   .. step:: Define the index.
      
      Create a ``create_index.go`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/field-types/<field-type>/create_index.go
         :caption: create_index.go
         :language: go
         :linenos:
         :copyable:

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Create the index.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run create_index.go

         .. output::
            :visible: false

            New index name: default

For the steps-create-index-java file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Set up your Java project with the MongoDB Java driver.

      .. include:: /includes/fts/field-types/add-java-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation
      </java/sync/current/quick-start/#std-label-add-mongodb-dependency>`.

   .. step:: Define the index.

      In your project's base package directory, create a 
      ``CreateIndex.java`` file and copy and paste the following code 
      into this file.  

      .. literalinclude:: /includes/fts/field-types/<field-type>/CreateIndex.java
         :language: java
         :caption: CreateIndex.java
         :linenos:
         :copyable: true

      .. include:: /includes/fts/field-types/find-connection-string.rst

   .. step:: Compile and run the file to create the index.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            javac CreateIndex.java
            java CreateIndex

         .. output::
            :visible: false

            New index name: default

For the steps-create-index-mongosh file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal
   
   .. step:: Connect to the deployment using {+mongosh+}. 
    
      In your terminal, connect to your {+service+} cloud-hosted 
      deployment or local deployment from {+mongosh+}. For detailed 
      instructions on how to connect, see 
      :mongosh:`Connect to a Deployment </connect/>`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
                
             use <database> 

         .. output:: 
            :visible: false
            :language: shell 

            switched to db <database>

   .. step:: Run the :method:`db.collection.createSearchIndex()` method to create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            db.<collection>.createSearchIndex(
              "default",
                {
                  "mappings": { 
                    "dynamic": true|false,
                    "fields": {
                    "<field-name>": {
                        "type": "<field-type>",
                        "representation": "int64|double",
                        "indexIntegers": true|false,
                        "indexDoubles": true|false
                    } 
                  }
                }
              }
            )

         .. output::
            :visible: false
            
            default

For the steps-create-index-nodejs file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the index.

      Create a ``create-index.js`` file in your project directory, 
      and copy and paste the following code into the file.   
   
      .. literalinclude:: /includes/fts/field-types/<field-type>/create-index.js
         :caption: create-index.js
         :language: javascript
         :copyable:
         :linenos:

      .. include:: /includes/fts/field-types/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::

            New index name: default

For the steps-create-index-python file:

Define the Index for the |fts-field-type| Type 
----------------------------------------------

.. procedure::
   :style: normal
   
   .. step:: Set up the Python project.

      .. literalinclude:: /includes/fts/field-types/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Define the index.

      Create a ``create_index.py`` file in your project directory, 
      and copy and paste the following code into the file.  
      
      .. literalinclude:: /includes/fts/field-types/<field-type>/create_index.py
         :caption: create_index.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/fts/field-types/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_index.py

         .. output::
            :visible: false

            New index name: default