Select the operating system platform on which you are running the
MongoDB client you have selected.

.. note ::
   
   If you are running your ``mongod`` instance with the default ``host`` (localhost)
   and ``port`` (27017), you can leave those parameters out when running
   ``mongo`` shell.

.. tabs-platforms::

   tabs:
       
     - id: windows
       content: |

         .. code-block:: sh

            mongo.exe --host <HOSTNAME> --port <PORT>

     - id: linux
       content: |

         .. code-block:: sh

            mongo --host <HOSTNAME> --port <PORT>
     
     - id: macos
       content: |
       
         .. code-block:: sh

            mongo --host <HOSTNAME> --port <PORT>






