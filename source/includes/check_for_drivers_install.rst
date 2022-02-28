You will need to ensure that your MongoDB instance is running and accessible.

.. tabs-cloud::

   hidden: true

   tabs:
     - id: cloud
       content: |

         Check that you have an Atlas account and have deployed a MongoDB database
         cluster. See :ref:`Get Started with Atlas <guides-create-a-cluster>` for information
         on how to login and create a cluster in Atlas.

     - id: local
       content: |

         .. tabs-platforms::

            tabs:

              - id: windows
                content: |
                  To make sure that your MongoDB instance is running on Windows,
                  run the following command from the Windows command prompt:

                  .. code-block:: bat

                     tasklist /FI "IMAGENAME eq mongod.exe"

                  If a :binary:`mongod.exe <bin.mongod.exe>` instance is running, you will
                  see something like:

                  .. code-block:: bat

                     Image Name                     PID Session Name        Session#    Mem Usage
                     ========================= ======== ================ =========== ============
                     mongod.exe                    8716 Console                    1      9,508 K

              - id: linux
                content: |

                  To make sure your MongoDB instance is running on Linux, run the
                  following command from your terminal:

                  .. code-block:: sh

                     ps -e| grep 'mongod'

                  If a :binary:`~bin.mongod` instance is running, you will see
                  something like:

                  .. code-block:: sh

                     89780 ttys026    0:53.48 ./mongod

              - id: macos
                content: |

                  To make sure your MongoDB instance is running on Mac, run the
                  following command from your terminal:

                  .. code-block:: sh

                     ps -e | grep 'mongod'

                  If a :binary:`~bin.mongod` instance is running, you will see
                  something like:

                  .. code-block:: sh

                     89780 ttys026    0:53.48 ./mongod
