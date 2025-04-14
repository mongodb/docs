The MongoDB binaries are in the ``bin/`` directory of the tarball. You can 
either:

- Copy the binaries into a directory listed in your ``PATH`` variable, such as 
  ``/usr/local/bin`` (Update ``/path/to/the/mongodb-directory/`` with your 
  installation directory as appropriate)

  .. code-block:: bash 
  
      sudo cp /path/to/the/mongodb-directory/bin/* /usr/local/bin/ 

- Create symbolic links to the binaries from a directory listed in your ``PATH`` 
  variable, such as ``/usr/local/bin`` (Update 
  ``/path/to/the/mongodb-directory/`` with your installation directory as 
  appropriate): 
  
  .. code-block:: bash 
    
      sudo ln -s  /path/to/the/mongodb-directory/bin/* /usr/local/bin/