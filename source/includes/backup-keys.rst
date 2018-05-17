To back up the keys, use the following commands to launch a temporary
container that copies the key files from the Charts volume to a
newly created directory on the host system:

.. tabs-platforms::

   tabs:

     - id: windows
       content: |

         .. code-block:: ps1

            mkdir c:\temp\charts-keys-backup
            docker run -it -v mongodb-charts_keys:/volume -v /c/temp/charts-keys-backup:/backup alpine sh -c 'cp /volume/* /backup'

         .. include:: /includes/fact-docker-unix-paths-windows.rst

     - id: macos
       content: |

         .. code-block:: sh

            mkdir /tmp/charts-keys-backup
            docker run -it -v mongodb-charts_keys:/volume -v /tmp/charts-keys-backup:/backup alpine sh -c 'cp /volume/* /backup'

     - id: linux
       content: |

         .. code-block:: sh

            mkdir /tmp/charts-keys-backup
            docker run -it -v mongodb-charts_keys:/volume -v /tmp/charts-keys-backup:/backup alpine sh -c 'cp /volume/* /backup'

.. important::

   Once the operation above completes, store the key in a secure
   location that is not on the |charts-short| server.