.. procedure:: 
   :style: normal

   .. step:: Set up the Environment

      A. Initialize your Node.js project.

         Run the following commands in your terminal 
         to create a new directory named ``hybrid-search-mongodb`` and
         initialize your project:

         .. code-block::

            mkdir hybrid-search-mongodb
            cd hybrid-search-mongodb
            npm init -y

      #. Install and import dependencies.

         Run the following command:

         .. code-block::

            npm install mongodb

      #. Update your ``package.json`` file.

         In your project's ``package.json`` file, specify the 
         ``type`` field as shown in the following example,
         and then save the file.

         .. code-block:: javascript
            :emphasize-lines: 3

            {
               "name": "hybrid-search-mongodb",
               "type": "module",
               ...

      #. Create an ``.env`` file.

         i. In your project, create a ``.env`` file to store your Atlas connection
            string.

            .. code-block::
         
               ATLAS_CONNECTION_STRING = "<connection-string>";

         #. Replace the ``<connection-string>`` placeholder values with your |srv|
            :manual:`connection string 
            </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
            for your |service| {+cluster+}. Your connection string should use
            the following format:
         
            .. code-block::
         
               mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

            .. include:: /includes/note-node-js-env-minimum-requirement.rst

   .. step:: Define the {+avs+} index.

      The following index definition indexes the ``plot_embedding`` field as
      the {+avs+} field when querying the collection.

      A. Create a file called ``avs-index.js``, and paste the following
         code into it:

         .. literalinclude:: /includes/avs/rrf-tutorial/avs-index.js
            :language: javascript

      #. Run the following command to execute the code:

         .. code-block:: shell
   
            node --env-file=.env avs-index.js

         |service| might take few minutes to create the index. |service|
         sends an email when the index is ready for use. In the
         {+atlas-ui+}, the newly created index appears on the
         :guilabel:`Atlas Search` tab. While the index is building,
         the :guilabel:`Status` field reads :guilabel:`Build in Progress`.
         When the index is finished building, the :guilabel:`Status`
         field reads :guilabel:`Active`.

   .. step:: Define the |fts| index. 

      The following index definition indexes the ``title`` field as the 
      :ref:`string <bson-data-types-string>` type for querying the
      field.

      A. Create a file called ``fts-index.js``, and paste the following
         code into it:

         .. literalinclude:: /includes/avs/rrf-tutorial/fts-index.js
            :language: javascript

      #. Run the following command to execute the code:

         .. code-block:: shell
   
            node --env-file=.env fts-index.js

         |service| might take few minutes to create the index. |service|
         sends an email when the index is ready for use. In the
         {+atlas-ui+}, the newly created index appears on the
         :guilabel:`Atlas Search` tab. While the index is building,
         the :guilabel:`Status` field reads :guilabel:`Build in Progress`.
         When the index is finished building, the :guilabel:`Status`
         field reads :guilabel:`Active`.
