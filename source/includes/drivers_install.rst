.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         The ``mongo`` shell is packaged with the MongoDB Server
         Community and Enterprise distributions, and is also available
         for users of Atlas as a client-only download.

         MongoDB binaries are located in a directory that starts with
         "mongodb-". You should see a file named ``mongo``, which is
         the shell executable.

         If you do not have ``mongo`` shell installed, follow the
         install directions for your environment.

         .. include:: /includes/mongo_shell_install.rst


     - id: compass
       content: |

         To install Compass, see the `Compass installation instructions
         <https://mongodb.com/docs/compass/current/install/>`__

     - id: go
       content: |

         The MongoDB Go driver can be installed using ``go get``:

         .. code-block:: sh

            go get github.com/mongodb/mongo-go-driver

         The output of this may look like a warning stating something like:

         .. code-block:: none

            package github.com/mongodb/mongo-go-driver: no Go files in (...).

         This is expected output.

         Alternatively if you are using the ``dep`` package manager to
         install the driver,
         you can install the main mongo package as well as the bson and
         mongo/options package using this command:

         .. code-block:: sh

            dep ensure --add github.com/mongodb/mongo-go-driver/mongo \
            github.com/mongodb/mongo-go-driver/bson \
            github.com/mongodb/mongo-go-driver/mongo/options

     - id: python
       content: |
         To install Pymongo, see the `Pymongo  documentation
         <http://api.mongodb.com/python/current/installation.html>`__.

     - id: motor
       content: |
         To install Motor, see the `Motor documentation
         <https://motor.readthedocs.io/en/stable/installation.html>`__

     - id: java-sync
       content: |
         To install the Java driver, see the `Java Driver documentation
         <https://mongodb.github.io/mongo-java-driver/>`__

     - id: nodejs
       content: |
          To install the node.js driver, see the `Node.js Driver documentation
          <http://mongodb.github.io/node-mongodb-native/>`__

     - id: csharp
       content: |
         To install the C#/.NET driver, see the `C# Driver documentation
         <http://mongodb.github.io/mongo-csharp-driver/>`__

     # - id: php
     #   content: |
     #     Here's how you `install the PHP library
     #     <https://mongodb.com/docs/php-library/current/tutorial/install-php-library/>`__
     #
     # - id: perl
     #   content: |
     #     Here's how you `install the perl driver
     #     <https://github.com/mongodb/mongo-perl-driver/blob/master/INSTALL.md>`__
     #
     # - id: ruby
     #   content: |
     #     Here's how you `install the Ruby driver
     #     <https://mongodb.com/docs/ruby-driver/master/installation/>`__
     #
     # - id: scala
     #   content: |
     #     Here's how you `install the Scala driver
     #     <http://mongodb.github.io/mongo-scala-driver/2.1/getting-started/installation-guide/>`__
     #
