a. Initialize your Node.js project.

   Run the following commands in your terminal 
   to create a new directory named ``atlas-search-quickstart`` and
   initialize your project:

   .. code-block::

      mkdir atlas-search-quickstart
      cd atlas-search-quickstart
      npm init -y

#. Add the :driver:`MongoDB Node Driver </node/current>` as a dependency in your project:

   .. code-block:: sh

      npm install mongodb

#. Define the index.

   Create a file named ``create-index.js``. Copy and paste the following
   code into the file.
   
   .. literalinclude:: /includes/fts/search-index-management/create-index-tutorial.js
      :caption: create-index.js
      :language: javascript
      :copyable:
   
#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create the index.

   .. io-code-block::
      :copyable: true

      .. input::
         :language: shell

         node create-index.js

      .. output::

         default
