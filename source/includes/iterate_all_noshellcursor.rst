.. tabs-drivers::

   tabs:

     - id: python
       content: |
         .. literalinclude:: /includes/code/python/crud-read-iterate.py
            :caption: crud_read.py
            :language: python
            :dedent: 0

     - id: go
       content: |

         .. literalinclude:: /includes/code/go/crud-read-iterate.go
            :caption: crudRead.go
            :language: go
            :linenos:
            :dedent: 0

     - id: motor
       content: |

         In the code snippet above you may have noticed the code that
         iterates the results and prints them to the command line:

         .. code-block:: python

            async for doc in cursor:
                print(doc)

     - id: java-sync
       content: |

         .. literalinclude:: /includes/code/java/CrudReadIterate.java
            :caption: CrudRead.java
            :language: java
            :linenos:
            :dedent: 0

     - id: nodejs
       content: |

         Iterate the results and print them to the console. Operations like
         this are **asychronous** in the MongoDB Node.js
         driver by default, meaning the Node.js runtime doesn't block other
         operations while waiting for them to finish execution.

         In order to simplify the operation, you specify the ``await``
         keyword, which **will** cause the runtime to wait for the operation.
         This is often easier than specifying a callback, or chaining
         a promise.

         For more information, see the :ref:`Promise and Callbacks guide <node-promise-and-callbacks>`.

         .. literalinclude:: /includes/code/node/crud-read-iterate.js
            :caption: crud-read.js
            :language: javascript
            :dedent: 0


     - id: csharp
       content: |

         .. literalinclude:: /includes/code/dotnet/CrudReadIterate.cs
            :caption: CrudRead.cs
            :language: csharp
            :dedent: 0

