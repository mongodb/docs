.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Initialize your application

      Ensure you have the following dependencies installed
      in your development environment:

      - `Python3 version 3.8 or later <https://www.python.org/downloads/>`__
      - `pip <https://pip.pypa.io/en/stable/installation/>`__
      - `dnspython <https://pypi.org/project/dnspython/>`__

      Run the following commands in your shell to create a new
      directory and a file for your application. The commands also
      install the {+python-driver+} in a virtual environment.

      .. tabs::

         .. tab:: macOS
            :tabId: macos

            .. code-block:: shell

               mkdir pymongo-quickstart
               cd pymongo-quickstart
               touch quickstart.py
               python3 -m venv venv
               source venv/bin/activate
               python3 -m pip install pymongo
         
         .. tab:: windows
            :tabId: windows

            .. code-block:: shell
            
               mkdir pymongo-quickstart
               cd pymongo-quickstart
               type nul > quickstart.py
               python -m venv venv
               .\venv\Scripts\activate
               python -m pip install pymongo

   .. step:: Create your application

      Copy and paste the following code into ``quickstart.py``. This code
      connects to your cluster and queries your sample data.

      .. literalinclude:: /shared/drivers-get-started/python/get-started-connect.py
         :language: python

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      From your project directory, run the following command to start
      the application:
      
      .. code-block:: shell

         python3 quickstart.py

      The output includes details of the retrieved movie document:

      .. include:: /get-started/includes/application-output.rst
