.. tabs-drivers::

   .. tab::
     :tabid: java-sync

     .. literalinclude:: /includes/automatic-enc-options/code-snippets/opts.java
         :language: java
         :emphasize-lines: 3-8

   .. tab::
     :tabid: nodejs

     .. literalinclude:: /includes/automatic-enc-options/code-snippets/opts.js
         :language: javascript
         :emphasize-lines: 5-9

   .. tab::
     :tabid: python

     .. literalinclude:: /includes/automatic-enc-options/code-snippets/opts.py
         :language: python
         :emphasize-lines: 2-5

   .. tab::
     :tabid: csharp

     .. literalinclude:: /includes/automatic-enc-options/code-snippets/opts.cs
        :language: csharp
        :emphasize-lines: 2-6

   .. tab::
     :tabid: go

     .. literalinclude:: /includes/automatic-enc-options/code-snippets/opts.go
        :language: go
        :emphasize-lines: 1-5


   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/automatic-enc-options/code-snippets/opts-shell.js
         :language: javascript
         :emphasize-lines: 1-7

      .. tip:: Environment Variables

         If possible, consider defining the credentials provided in
         ``kmsProviders`` as environment variables, and then passing them
         to :binary:`~bin.mongosh` using the :option:`--eval
         <mongosh --eval>` option. This minimizes the chances of credentials
         leaking into logs.
