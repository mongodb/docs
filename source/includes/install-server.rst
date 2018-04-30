.. tabs::

   tabs:
     - id: windows
       name: Windows
       content: |

         Download the binaries from the `MongoDB Download Center
         <https://www.mongodb.com/download-center#production>`_.

         .. include:: /includes/fact-install-windows.rst

     - id: macOS
       name: macOS
       content: |

         .. admonition:: Platform Support

            MongoDB 3.6 is not tested on APFS, the new filesystem in macOS
            10.13 and may encounter errors.
       
         .. include:: /includes/steps/install-mongodb-on-macOS.rst

     - id: linux
       name: Linux
       content: |
         .. note::
            These instructions are for installing MongoDB directly from
            an archive file. If you would rather use your linux
            distribution's package manager, refer to the
            :manual:`installation instructions </installation>` for your
            distribution in the MongoDB Manual.

         .. include:: /includes/steps/install-mongodb-on-linux-64.rst
