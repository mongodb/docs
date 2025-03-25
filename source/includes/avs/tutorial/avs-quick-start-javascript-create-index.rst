a. Add the MongoDB Node Driver as a dependency in your project:

   .. code-block:: sh

      npm install mongodb

   .. tip::
      
      The examples on this page assume your project manages modules as
      CommonJS modules. If you're using ES modules, instead, you must
      modify the import syntax.

#. Define the index.

   Create a file named ``vector-index.js``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example.js
      :language: javascript
      :copyable: true
      :caption: vector-index.js
      :emphasize-lines: 4
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the following command to create the index.

   .. io-code-block::
       :copyable: true 

       .. input:: 
          :language: shell 

          node vector-index.js

       .. output:: /includes/avs/index-management/create-index/create-index-output.sh
          :language: console
