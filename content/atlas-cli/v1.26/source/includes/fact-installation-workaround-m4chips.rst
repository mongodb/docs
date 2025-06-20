.. important::

   If your local machine runs MacOS Sequoia 15.2 with the Apple Silicon M4 chip, add the following 
   :abbr:`JVM (Java Virtual Machine)` parameter to the ``docker run`` command 
   to prevent your container from crashing upon startup. For example: 

   .. code-block:: sh
      
      docker run -e JAVA_TOOL_OPTIONS="-XX:UseSVE=0" -p 27017:27017 mongodb/mongodb-atlas-local
