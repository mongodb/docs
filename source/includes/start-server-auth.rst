.. tabs-platforms::
   
   tabs:
     
     - id: windows
       content: |

         .. include:: /includes/run-mongodb-on-windows-auth.rst

     - id: linux
       content: |
         .. note:: 
  
            The following instructions assume that you installed MongoDB
            from a ``tar.gz`` archive rather than using a package
            manager. If you used the package manager for your Linux
            distribution to install MongoDB, edit your
            :ref:`configuration file <configuration-options>` to include
            the :setting:`security.authorization` setting before starting
            your :binary:`~bin.mongod` service as usual. Refer to the
            :ref:`configuration file <configuration-options>`
            documentation for more information.

         .. include:: /includes/run-mongodb-on-linux-auth.rst

     - id: macos
       content: |
         
         .. include:: /includes/run-mongodb-on-linux-auth.rst