
.. tabs::

   tabs:
     - id: linux
       name: Linux
       content: |

         Use the following command to find the host |fqdn|:

         .. code-block:: shell

            > hostname -f

         Your result should look like this:

         .. code-block:: shell
            :copyable: false

            mongodb.example.com

     - id: windows
       name: Windows
       content: |

         Windows hosts host must be connected to the internet and
         attached to a Active Directory domain. 

         Use the following command to find the host |fqdn|:

         .. code-block:: powershell

            PS C:\> systeminfo | findstr /B /C:"Host" /C:"Domain"

         Your result should look like this:

         .. code-block:: powershell
            :copyable: false

            Host Name:                 mongodb
            Domain:                    example.com

         Combine the ``Host Name`` and ``Domain`` with a ``.`` to get
         the |fqdn|. With the previous example, the |fqdn| is
         ``mongoodb.example.com``.
