Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

The following example creates a {+fts+} index on the ``sample_analytics.customers`` 
collection and indexes the ``active`` field as the ``boolean`` type:

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib 

      1. In the :guilabel:`Add Field Mapping` window, select
         :guilabel:`address.location` from the :guilabel:`Field
         Name` dropdown. 
      #. Click the :guilabel:`Data Type` dropdown and select
         :guilabel:`Boolean`.
      #. Click :guilabel:`Add`. 

   .. tab:: JSON Editor 
      :tabid: jsonib

      Replace the default index definition with the following
      definition:

      .. literalinclude:: /includes/fts/field-types/boolean/create-index-basic.json
         :language: json
         :linenos:
         :copyable: true 
