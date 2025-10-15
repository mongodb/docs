.. procedure:: 
   :style: normal 

   .. step:: Create your Node.js app.

      a. Run the following command to create and navigate to the
         directory for the app:

         .. code-block::

            mkdir syntheticdata
            cd syntheticdata

      #. Run the following command to initialize your project and link
         it to ``npm``.

         .. code-block::

            npm init

         Press :kbd:`Enter` to accept all default values
         **except** for ``entry point: (index.js)``. When the terminal
         returns ``entry point: (index.js)``, enter this text and
         press :kbd:`Enter`:

         .. code-block::

            myapp.js

         Continue to accept all default values and type ``Yes`` when
         prompted.

      #. Run the following command to install ``express``, a web 
         application framework:

         .. code-block::

            npm install express --save

      #. In the directory that you created, create a file named 
         ``myapp.js``.

   .. step:: Add the code to generate synthetic data.

      In the ``myapp.js`` file, add the following code. Replace the
      following placeholder values with your values and save the 
      contents of the file:
      
      - ``<YOUR-ATLAS-URI>``: the connection string for your
        |service| {+cluster+}. To learn how to find your connection
        string, see :manual:`Find Your MongoDB Atlas Connection String
        </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.
      - ``<DATABASE-NAME>``: Name of the database to create
        in |service|.
      - ``<COLLECTION-NAME>``: Name of the collection to create in 
        |service|.

      .. literalinclude:: /includes/generate-synthetic-data.js
         :language: javascript

      For example, your code may include the following lines that
      specify a database named ``synthetic-data-db`` and
      a collection named ``synthetic-data-collection``:

      .. code-block:: javascript

          const collection = client.db("synthetic-data-db").collection("synthetic-data-collection");

      This code creates a time series collection about cats, adds the
      following fields to each document, and populates the fields with
      synthetic data from `faker.js 
      <https://github.com/faker-js/faker>`__:
      
      - ``timestamp_day``
      - ``cat``
      - ``owner.email``
      - ``owner.firstName``
      - ``owner.lastName``
      - ``events``
      
      You can replace the fields and values in the code with fields and
      values that align with your data. To learn more about available
      fields in `faker.js <https://github.com/faker-js/faker>`__, see
      the `Faker API Reference <https://fakerjs.dev/api/>`__.

   .. step:: Run the app to generate the data.

      Run the following code in the terminal to run your app:

      .. code-block::

         node myapp.js

      The app generates 5,000 documents that reflect the data pattern
      in ``myapp.js``.

      After you run this code, you can press :kbd:`CTRL` + :kbd:`C` to
      exit the running application.

   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Verify that the data generates successfully.
      
      Expand the name of the database you created and click the
      name of the collection you created. Your synthetic data
      displays.
