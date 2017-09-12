The optional ``mongosqlds`` array defines connections to an instance of
the MongoDB Connector for BI.

.. code-block:: json

   {
     "mongosqlds" : [
       {
         "hostname" : "<string>",
         "id" : "<ObjectId>",
         "logPath" : "<string>",
         "logPathWindows" : "<string>",
         "logRotate" : {
           "sizeThresholdMB" : "<number>",
           "timeThresholdHrs" : "<number>",
           "numUncompressed" : "<string>",
           "percentOfDiskspace" : "<number>"
         },
         "mongodbSSLEnabled" : "<boolean>",
         "port" : "<number>",
         "sslMode" : "<string>",
         "sslPEMKeyFile" : "<string>",
         "sslPEMKeyPassword" : "<string>",
         "urls" : {
           "<platform>" : "<string>",
           "default" : "<string>"
         },
         "version" : "<string>"
       }
     ]
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``mongosqlds.hostname``
     - string
     - The host onto which to deploy the ``mongosqld``.

   * - ``mongosqlds.id``
     - ObjectId
     - The unique identifier for the ``mongosqld`` instance.

   * - ``mongosqlds.logPath``
     - string
     - UNIX path to the ``mongosqld`` log file.

   * - ``mongosqlds.logPathWindows``
     - string
     - Windows path to the ``mongosqld`` log file.

   * - ``mongosqlds.logRotate``
     - object
     - *Optional*. Enables log rotation for the ``mongosqld`` logs.

   * - ``mongosqlds.logRotate.sizeThresholdMB``
     - number
     - The maximum size in MB for an individual log file before
       rotation.

   * - ``mongosqlds.logRotate.timeThresholdHrs``
     - integer
     - The maximum time in hours for an individual log file before
       rotation.

   * - ``mongosqlds.logRotate.numUncompressed``
     - integer
     - *Optional*. The maximum number of total log files to leave
       uncompressed, including the current log file. The default is
       ``5``.

   * - ``mongosqlds.logRotate.percentOfDiskspace``
     - number
     - *Optional*. The maximum percentage of total disk space all log
       files should take up before deletion. The default is ``0.02``.

   * - ``mongosqlds.mongodbSSLEnabled``
     - boolean
     - Indicator that the MongoDB instance to which ``mongosqld`` is
       connected has :abbr:`TLS (Transport Security Layer)` /
       :abbr:`SSL (Secure Sockets Layer)` enabled.

   * - ``mongosqlds.port``
     - number
     - The port on which the ``mongosqld`` listens.

   * - ``mongosqlds.sslMode``
     - string
     - State of SSL deployment: ``none``, ``allowSSL`` or
       ``requireSSL``.

   * - ``mongosqlds.sslPEMKeyFile``
     - string
     - Path to the :abbr:`SSL (Secure Socket Layer)` ``.pem`` file.

   * - ``mongosqlds.sslPEMKeyPassword``
     - string
     - Password for the ``.pem`` key file if it was encrypted.

   * - ``mongosqlds.urls.<platform>``
     - objects
     - A list of objects that identifies the platform and download
       :abbr:`URLs (Uniform Resource Locators)` for ``mongosqld``. Each
       object contains a key- value pair. Each key is either the name of
       a build (an operating system and, optionally, its version) or
       ``default``. Each value is a :abbr:`URL (Uniform Resource
       Locator)` for downloading the ``mongosqld``. The object must
       include the ``default`` key set to the default download
       :abbr:`URLs (Uniform Resource Locators)` for the platform.

   * - ``mongosqlds.version``
     - number
     - The version of the ``mongosqld``.
