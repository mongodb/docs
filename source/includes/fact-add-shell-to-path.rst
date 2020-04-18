.. tabs::

   tabs:

     - id: windows
       name: Windows

       content: |

         a. Double-click the ``.msi`` file in Windows Explorer
            and proceed through the installation wizard.

         #. Add the ``bin`` directory to your command path.

            1. Click :icon-fa5-brands:`windows` and select :guilabel:`Control Panel`.

            #. Click :guilabel:`System and Security`, then :guilabel:`System`,
               then :guilabel:`Advanced System Settings`.

            #. Click :guilabel:`Environment Variables`.

            #. Select :guilabel:`Path` and click :guilabel:`Edit`.

            #. Add the ``bin`` directory where the installer placed your
               MongoDB executables and click :guilabel:`OK`.

     - id: macos
       name: macOS

       content: |

         Copy the Homebrew command from the |service| UI
         window and run it in your terminal.

     - id: linux
       name: Linux

       content: |

         a. Run the following command in your terminal to extract
            the :binary:`~bin.mongo` shell:

            .. code-block:: shell

               tar -xzf ./<filename>.tgz

         #. Add the ``bin`` directory to your ``PATH``
            environment variable.

            .. code-block:: none

               export PATH=/<extraction-directory>/bin:$PATH

            .. note::

               This command applies only to the current shell session. Edit
               the ``PATH`` environment variable in ``~/.profile``
               to update the variable across shell sessions and reboots.
