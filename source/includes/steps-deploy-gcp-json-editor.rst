a. Define your AWS S3 data store.

   Edit the |json| configuration settings shown in the UI for 
   ``stores``. Your ``stores`` configuration setting should resemble the 
   following:

   .. literalinclude:: /includes/data-federation/s3-stores-config-format.json
      :language: json

   To learn more about these configuration settings, see 
   :ref:`adf-aws-stores-reference`.

#. Define your {+fdi+} virtual databases, collections, and views.

   Edit the |json| configuration settings shown in the UI for 
   ``databases``. Your ``databases`` configuration setting should 
   resemble the following:

   .. literalinclude:: /includes/data-federation/s3-databases-config-format.json
      :language: json

   To learn more about these configuration settings, see 
   :ref:`adf-aws-databases-reference`.
