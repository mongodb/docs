You are a writing assistant that will populate multiple files with some text that corresponds to the method type.

Guidelines:
- Replace the `<tutorial-type>` placeholder with the specified field type name.
- Replace the `<index-name>` placeholder with the specified index name.
- DO NOT hallucinate or add any additional content. 

If the file does not exist, don't do anything. For example, if you can't find a file named steps-create-index-c in the `/source/includes/fts/tutorials/<tutorial-type>/` directory, don't do anything.

For each file that exists:
- Add the following text according to corresponding method type. Each file has `/<tutorial-type>/steps-create-index-<method-type>.rst` as its format.
- You MUST add exactly the text that follows. Do not skip any of the content or add any additional content.
- Create any new files that are referenced that do not already exist in the `/source/includes/fts/tutorials/<tutorial-type>/` directory. These are the files that follow `literalinclude::`. Leave the files blank.

For the steps-create-index-atlas-ui file:

<start_of_text_to_add>
Create the |fts| Index   
-----------------------------

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
</end_of_text_to_add>

For the steps-create-index-c file:

<start_of_text_to_add>
Create the |fts| Index  
-----------------------------

.. procedure::
   :style: normal

   .. step:: Set up the C project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` for this project: 

      .. literalinclude:: /includes/fts/tutorials/initialize-project-c.sh
         :language: shell
         :linenos:
         :copyable: true

      Add the C driver to your project by following the instructions in the 
      `MongoDB C Driver documentation <https://www.mongodb.com/docs/languages/c/c-driver/current/get-started/>`__.

   .. step:: Define the index.

      Create a ``create_index.c`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/create_index.c
         :caption: create_index.c
         :language: c
         :linenos:
         :copyable:

      .. include:: /includes/fts/tutorials/find-connection-string.rst

   .. step:: Set up a CMake application

      To configure your application, create a ``CMakeLists.txt`` file in
      your project directory. Then, add the following code to the file:

      .. literalinclude:: /includes/fts/tutorials/initialize-cmake-c.txt
         :caption: CMakeLists.txt
         :language: txt
         :linenos:
         :copyable:

      The preceding code performs the following actions:
      
      - Configures a C project.
      - Creates a ``index.out`` executable for your application.
      - Finds and requires the C driver. Replace the ``<version>``
        placeholder with your C driver version <tutorial-type>, such as ``2.0.0``.
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
            :visible: false

            Index created!
</end_of_text_to_add>

For the steps-create-index-cpp file:

<start_of_text_to_add>
Create the |fts| Index  
-----------------------------

.. procedure::
   :style: normal

   .. step:: Set up the C++ project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` for this project: 

      .. literalinclude:: /includes/fts/tutorials/initialize-project-cpp.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the
      `MongoDB C++ Driver documentation <https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/get-started/>`__.

   .. step:: Define the index.

      Create a ``CreateIndex.cpp`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/CreateIndex.cpp
         :caption: CreateIndex.cpp
         :language: cpp
         :linenos:
         :copyable:

      .. include:: /includes/fts/tutorials/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            c++ --std=c++17 CreateIndex.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

         .. output::
            :visible: false

            New index name: <index-name>
      
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
</end_of_text_to_add>

For the steps-create-index-csharp file:

<start_of_text_to_add>
Create the |fts| Index   
-----------------------------

.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 

      .. literalinclude:: /includes/fts/tutorials/initialize-project-csharp.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the 
      :driver:`MongoDB C# Driver documentation </csharp/current/get-started>`.
   
   .. step:: Define the index.
   
      Paste the following code into the ``Program.cs`` file.

      .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/CreateIndex.cs
         :caption: Program.cs
         :language: csharp
         :linenos:
         :copyable:

      .. include:: /includes/fts/tutorials/find-connection-string.rst
   
   .. step:: Create the index.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::
            :visible: false

            New index name: <index-name>
</end_of_text_to_add>

For the steps-create-index-go file:

<start_of_text_to_add>
Create the |fts| Index   
-----------------------------

.. procedure::
   :style: normal

   .. step:: Set up and initialize the Go module.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 
      
      .. literalinclude:: /includes/fts/tutorials/initialize-project-go.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the
      :ref:`MongoDB Go Driver documentation <go-get-started>`.

   .. step:: Define the index.
      
      Create a ``create_index.go`` file in your project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/create_index.go
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

            New index name: <index-name>
</end_of_text_to_add>

For the steps-create-index-java file:

<start_of_text_to_add>
Create the |fts| Index  
-----------------------------

.. procedure::
   :style: normal

   .. step:: Set up your Java project with the MongoDB Java driver.

      .. include:: /includes/fts/tutorials/add-java-dependency.rst

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation </java/sync/current/get-started/>`.

   .. step:: Define the index.

      In your project's base package directory, create a 
      ``CreateIndex.java`` file and copy and paste the following code 
      into this file.  

      .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/CreateIndex.java
         :language: java
         :caption: CreateIndex.java
         :linenos:
         :copyable: true

      .. include:: /includes/fts/tutorials/find-connection-string.rst

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

            New index name: <index-name>
</end_of_text_to_add>

For the steps-create-index-mongosh file:

<start_of_text_to_add>
Create the |fts| Index  
-----------------------------

.. procedure::
   :style: normal
   
   .. step:: Connect to the deployment by using ``mongosh``.
    
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

   .. step:: Run the ``db.collection.createSearchIndex()`` method to create the index.

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
                        "type": "<tutorial-type>",
                        // other fields, if applicable
                    } 
                  }
                }
              }
            )

         .. output::
            :visible: false
            
            default
</end_of_text_to_add>

For the steps-create-index-compass file:

<start_of_text_to_add>
Create the |fts| Index  
-----------------------------

.. procedure:: 
   :style: normal

   .. step:: Connect to your |service| cluster using |compass|.

      Open {+Compass+} and connect to your |service| cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, click the name of the database, then click the name of the collection.

   .. step:: Create the |fts| index.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create Atlas Search Index` to open the index creation dialog box.

      #. Name the index, ``<index-name>``.

      #. Specify the |json| |fts| index definition. 

         .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/index-definition-compass.json
            :copyable: true
            :language: json
            :linenos:

      #. Click :guilabel:`Create Search Index`.
</end_of_text_to_add>

For the steps-create-index-nodejs file:

<start_of_text_to_add>
Create the |fts| Index  
-----------------------------

.. procedure::
   :style: normal

   .. step:: Initialize your Node.js project.

      .. literalinclude:: /includes/fts/tutorials/initialize-project-node.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see the
      :driver:`MongoDB Node Driver documentation </node/current>`.

   .. step:: Define the index.

      Create a ``create-index.js`` file in your project directory, 
      and copy and paste the following code into the file.   
   
      .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/create-index.js
         :caption: create-index.js
         :language: javascript
         :copyable:
         :linenos:

      .. include:: /includes/fts/tutorials/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::
            :visible: false

            New index name: <index-name>
</end_of_text_to_add>

For the steps-create-index-python file:

<start_of_text_to_add>
Create the |fts| Index  
-----------------------------

.. procedure::
   :style: normal
   
   .. step:: Set up the Python project.

      .. literalinclude:: /includes/fts/tutorials/initialize-project-python.sh
         :language: shell
         :copyable: true

      For detailed installation instructions, see 
      :ref:`MongoDB Python Driver (PyMongo) <pymongo-get-started-download-and-install>`.

   .. step:: Define the index.

      Create a ``create_index.py`` file in your project directory, 
      and copy and paste the following code into the file.  
      
      .. literalinclude:: /includes/fts/tutorials/<tutorial-type>/create_index.py
         :caption: create_index.py
         :language: python
         :copyable:
         :linenos:

      .. include:: /includes/fts/tutorials/find-connection-string.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true 

         .. input::
            :language: shell

            python create_index.py

         .. output::
            :visible: false

            New index name: <index-name>
</end_of_text_to_add>