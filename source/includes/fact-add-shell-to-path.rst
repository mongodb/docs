.. tabs::

   tabs:

     - id: windows
       name: Windows

       content: |

         1. Extract the files from the downloaded archive.
         
         #. Click :icon-fa5-brands:`windows` and select 
            :guilabel:`Control Panel`.

         #. Click :guilabel:`System and Security`, then 
            :guilabel:`System`, then :guilabel:`Advanced System 
            Settings`.

         #. Click :guilabel:`Environment Variables`.

         #. Select :guilabel:`Path` and click :guilabel:`Edit`.

         #. Click :guilabel:`New`, add the filepath to your |mongosh| 
            binary, and click :guilabel:`OK`.

     - id: macos
       name: macOS

       content: |

         Copy the Homebrew command from the |service| UI
         window and run it in your terminal. If you downloaded the 
         MongoDB Shell directly, follow the steps to `install 
         <https://www.mongodb.com/docs/mongodb-shell/install/>`__ 
         |mongosh|.

     - id: linux
       name: Linux

       content: |

         Install the |mongosh| package.

         - For ``.deb`` package, use ``dpkg`` to install |mongosh|:

           .. code-block:: sh

              sudo dpkg -i mongodb-mongosh_<mongosh-version-and-platform>.deb

         - For ``.rpm`` package, use ``rpm`` to install |mongosh|:

           .. code-block:: sh

              sudo rpm -i mongodb-mongosh_<mongosh-version-and-platform>.rpm
