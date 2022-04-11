.. tabs::

   tabs:

     - id: windows
       name: Windows
       content: |

         1. Download using one of the following options:

            - Click :guilabel:`Download mongosh` to
              begin the download.

            - Click :guilabel:`Copy download URL` to copy a
              download |url| to your clipboard, then either:

              -  Use ``curl`` to fetch the installer file 
                 from the |url|, or

              -  Paste the |url| in a browser window.

            .. include:: /includes/facts/download-center-link.rst

         #. Extract the files from the downloaded archive.

         #. Add the {+mongosh+} binary to your ``PATH`` 
            environment variable.

            Ensure that the extracted MongoDB Shell binary 
            is in the desired location in your filesystem, 
            then add that location to your ``PATH``
            environment variable.

            a. Open the :guilabel:`Control Panel`.

            #. In the :guilabel:`System and Security` 
               category, click :guilabel:`System`.

            #. Click :guilabel:`Advanced system settings`. 
               The :guilabel:`System Properties` modal 
               displays.

            #. Click :guilabel:`Environment Variables`.

            #. Select :guilabel:`Path` and click
               :guilabel:`Edit`.

            #. Click :guilabel:`New` and add the filepath to 
               your {+mongosh+} binary.


     - id: macos
       name: macOS
       content: |

         1. Use the Homebrew command provided.

         #. Copy the Homebrew command from the {+atlas-ui+}
            window and run it in a terminal.

     - id: linux
       name: Linux
       content: |

         1. Download the installer using one of the
            following options:

            - Click :guilabel:`Download mongosh` to
              begin the download.

            - Click :guilabel:`Copy download URL` to copy a
              download |url| to your clipboard, then either:

              -  Use ``curl`` to fetch the installer file 
                 from the |url|, or

              -  Paste the |url| in a browser window.

            .. include:: /includes/facts/download-center-link.rst

            .. note::

               The type of file you download depends on the
               operating system you selected. If you select 
               a version of:

               - **Ubuntu or Debian** you receive a ``.deb``
                 package.
               - **RHEL, Amazon Linux, or SUSE** you receive
                 an ``.rpm`` package.

               If your operating system isn't listed, see
               the :mongosh:`.tgz installation instructions
               </install>` in the {+mongosh+} documentation. 

         #. Install the {+mongosh+} package.

            .. include:: /includes/facts/tabs-install-mongosh.rst

