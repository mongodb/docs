The optional ``mongosqlds`` array defines connections to an instance of
the MongoDB Connector for BI.

.. code-block:: json

   {
     "mongosqlds" : [
       {
         "hostname" : "<string>",
         "id" : "<number>",
         "logPath" : "<string>",
         "logPathWindows" : "<string>",
         "logRotate" : {
           "sizeThresholdMB" : "<number>",
           "timeThresholdHrs" : "<number>",
           "numUncompressed" : "<number>",
           "percentOfDiskspace" : "<number>"
         },
         "mongodbSSLEnabled" : "<boolean>",
         "port" : "<number>",
         "sslMode" : "<string>",
         "sslPEMKeyFile" : "<string>",
         "sslPEMKeyPassword" : "<string>",
         "urls" : {
           "<platform>" : {
             "<distribution>" : "<url>",
           }
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
     - number
     - The unique identifier for the ``mongosqld`` instance.

   * - ``mongosqlds.logPath``
     - string
     - UNIX path to the ``mongosqld`` log file. *Not needed for Windows
       servers hosting * ``mongosqld``.

   * - ``mongosqlds.logPathWindows``
     - string
     - Windows path to the ``mongosqld`` log file. *Not needed for UNIX
       servers hosting* ``mongosqld``.

   * - ``mongosqlds.logRotate``
     - object
     - Enables log rotation for the ``mongosqld`` logs. *Optional*.

   * - ``mongosqlds.logRotate.sizeThresholdMB``
     - number
     - The maximum size in MB for an individual log file before
       rotation. *Conditional: requires* ``mongosqlds.logRotate``.

   * - ``mongosqlds.logRotate.timeThresholdHrs``
     - number
     - The maximum time in hours for an individual log file before
       rotation. *Conditional: requires* ``mongosqlds.logRotate``.

   * - ``mongosqlds.logRotate.numUncompressed``
     - number
     - The maximum number of total log files to leave
       uncompressed, including the current log file. The default is
       ``5``. *Conditional: requires* ``mongosqlds.logRotate``.

   * - ``mongosqlds.logRotate.percentOfDiskspace``
     - number
     - *Optional*. The maximum percentage of total disk space all log
       files should take up before deletion. The default is ``0.02``.
       *Conditional: requires* ``mongosqlds.logRotate``.

   * - ``mongosqlds.mongodbSSLEnabled``
     - boolean
     - Indicator that the MongoDB instance to which ``mongosqld`` is
       connected has :abbr:`TLS (Transport Security Layer)` /
       :abbr:`SSL (Secure Sockets Layer)` enabled. *Optional.*

   * - ``mongosqlds.port``
     - number
     - The port on which the ``mongosqld`` listens.

   * - ``mongosqlds.sslMode``
     - string
     - State of SSL deployment: ``none``, ``allowSSL`` or
       ``requireSSL``. *Optional.*

   * - ``mongosqlds.sslPEMKeyFile``
     - string
     - Path to the :abbr:`SSL (Secure Socket Layer)` ``.pem`` file.
       *Conditional: requires* ``mongosqlds.sslMode`` *to be set to*
       ``allowSSL`` or ``requireSSL``.

   * - ``mongosqlds.sslPEMKeyPassword``
     - string
     - Password for the ``.pem`` key file if
       ``mongosqlds.sslPEMKeyFile`` was encrypted.

   * - ``mongosqlds.urls.<platform>``
     - objects
     - A list of objects that identifies the platform and download
       :abbr:`URLs (Uniform Resource Locators)` for ``mongosqld``. Each
       object contains a key- value pair. Each key is either the name of
       a build (an operating system and, optionally, its version) or
       ``default``. Each value is a :abbr:`URL (Uniform Resource
       Locator)` for downloading the ``mongosqld``.

   * - ``mongosqlds.version``
     - number
     - The version of the ``mongosqld``.
