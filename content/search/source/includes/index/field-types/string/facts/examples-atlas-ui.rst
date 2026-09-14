Try an Example for the |fts-field-type| Type
--------------------------------------------

The following index definition examples use collections in the
:ref:`sample data <available-sample-datasets>`. After you
:ref:`load the sample data <load-sample-data>`, you can use the
Visual Editor or |json| Editor to configure
these indexes. After you select your preferred configuration method,
select the database and collection, and refine your index to add field
mappings.

.. collapsible::
   :heading: Basic Example
   :sub_heading: Index specific field as the string type.
   :expanded: false

   The following index definition indexes string values in the
   ``title`` field as the |fts| ``string`` type:

   .. tabs::

      .. tab:: Visual Editor
         :tabid: vib

         a. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`title` from the :guilabel:`Field Name`
            dropdown.
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`String`.
         #. Review the default settings for the :guilabel:`String
            Properties`.
         #. Click :guilabel:`Add`.

      .. tab:: JSON Editor
         :tabid: jsonib

         Replace the default index definition with the following index
         definition.

         .. literalinclude:: /includes/index/field-types/string/code-snippets/atlas-ui/create-index-example-ui.json
            :language: json
            :copyable: true

.. collapsible::
   :heading: Multi Example
   :sub_heading: Index specific field with alternate analyzers as the string type.
   :expanded: false

   .. include:: /includes/index/field-types/string/facts/multi-example-intro.rst

   .. tabs::

      .. tab:: Visual Editor
         :tabid: vib

         .. note::

            To configure the ``similarity.type`` property, you must use the
            |json| Editor.

         a. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`title` from the :guilabel:`Field Name`
            dropdown.
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`String`.
         #. Review the default settings for the :guilabel:`String
            Properties`.
         #. Click :guilabel:`Add Multi Field`, enter ``english`` in
            the :guilabel:`Multi Field Name` field, and configure the
            following :guilabel:`Multi Field Properties`:

            .. list-table::
               :stub-columns: 1

               * - Index Analyzer
                 - Select ``lucene.english`` under
                   ``lucene.language``.

               * - Search Analyzer
                 - Select ``lucene.english`` under
                   ``lucene.language``.

         #. Click :guilabel:`Add Another Multi Field`, enter
            ``french`` in the :guilabel:`Multi Field Name` field, and
            configure the following :guilabel:`Multi Field Properties`:

            .. list-table::
               :stub-columns: 1

               * - Index Analyzer
                 - Select ``lucene.french`` under
                   ``lucene.language``.

               * - Search Analyzer
                 - Select ``lucene.french`` under
                   ``lucene.language``.

         #. Click :guilabel:`Add`.

      .. tab:: JSON Editor
         :tabid: jsonib

         Replace the default index definition with the following index
         definition.

         .. literalinclude:: /includes/index/field-types/string/code-snippets/atlas-ui/create-index-example-multi-ui.json
            :language: json
            :copyable: true
