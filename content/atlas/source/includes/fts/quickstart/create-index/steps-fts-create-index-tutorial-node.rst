a. Initialize your Node.js project.

   .. code-block::
    
      # Create a new directory and initialize the project
      mkdir atlas-search-quickstart && cd atlas-search-quickstart
      npm init -y

   .. code-block:: 

      # Add the MongoDB Node.js Driver to your project
      npm install mongodb

   For detailed installation instructions, see the
   :driver:`MongoDB Node Driver documentation </node/current>`.

#. Define the index.

   Paste the following code into a file named ``create-index.js``.
   
   .. literalinclude:: /includes/fts/search-index-management/create-index-tutorial.js
      :caption: create-index.js
      :language: javascript
      :emphasize-lines: 5
      :copyable:
      :linenos:

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create the index.

   .. io-code-block::
      :copyable: true

      .. input::
         :language: shell

         node create-index.js

      .. output::

         default
