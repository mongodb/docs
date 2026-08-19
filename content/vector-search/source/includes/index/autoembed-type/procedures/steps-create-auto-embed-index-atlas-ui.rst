.. procedure:: 
   :style: normal 

   .. include:: /includes/shared/procedures/steps-atlas-search.rst

   .. include:: /includes/index/autoembed-type/procedures/steps-configure-index.rst

   .. note:: 

      The basic, filter, and flat examples use the ``sample_mflix`` database and 
      ``movies`` collection. The nested field example uses the ``sample_airbnb`` 
      database and ``listingsAndReviews`` collection.

   .. step:: Specify the index definition.

      .. collapsible:: 
         :heading: Visual Editor 
         :sub_heading: Use the Visual Editor for a guided experience.
         :expanded: false

         To configure the index, do the following:

         .. include:: /includes/index/autoembed-type/procedures/create-auto-embed-ui.rst

         To learn more about the {+avs+} index settings, see
         :ref:`avs-types-vector-search`. 

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               .. include:: /includes/quick-start/facts/auto-embed-basic-example-description.rst

               Select the ``sample_mflix`` database and ``movies`` collection. Then, 
               configure the index for the :guilabel:`AutoEmbed` field as follows:

               .. list-table:: 
                  :header-rows: 1

                  * - Setting
                    - Necessity
                    - Value

                  * - :guilabel:`Path`
                    - Required
                    - Select ``fullplot``. 

                  * - :guilabel:`Embedding Model`
                    - Required
                    - Select ``voyage-4``.

            .. tab:: Filter Example 
               :tabid: advanced

               .. include:: /includes/quick-start/facts/auto-embed-filter-example-description.rst

               a. Select the ``sample_mflix`` database and ``movies`` collection. 
               
               #. Configure the index for the :guilabel:`AutoEmbed` field as follows:

                  .. list-table:: 
                     :header-rows: 1

                     * - Setting
                       - Necessity
                       - Value

                     * - :guilabel:`Path`
                       - Required
                       - Select ``Fullplot``. 

                     * - :guilabel:`Embedding Model`
                       - Required
                       - Select ``voyage-4``.

               #. Configure the index for the :guilabel:`Filter` fields as follows:

                  .. list-table:: 
                     :header-rows: 1

                     * - Setting
                       - Necessity
                       - Value

                     * - :guilabel:`Path`
                       - Required
                       - Select ``Genres`` and ``Year``.

      .. collapsible:: 
         :heading: JSON Editor 
         :sub_heading: Use the JSON Editor to edit the raw JSON.
         :expanded: false 

         Replace the default and placeholder values in the index definition as 
         needed. To learn more about the {+avs+} index settings, see 
         :ref:`avs-index-definition` and :ref:`avs-types-vector-search-options`.

         .. tabs:: 

            .. tab:: Basic Example
               :tabid: basic

               .. include:: /includes/quick-start/facts/auto-embed-basic-example-description.rst

               Select the ``sample_mflix`` database and ``movies`` collection. Then, 
               replace the default index definition with the following:

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/json/basic-auto-embed-example.json
                  :language: json
                  :copyable: true 
                  :linenos:

            .. tab:: Filter Example 
               :tabid: advanced

               .. include:: /includes/quick-start/facts/auto-embed-filter-example-description.rst

               Select the ``sample_mflix`` database and ``movies`` collection. Then, 
               replace the default index definition with the following:

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/json/filter-auto-embed-example.json
                  :language: json
                  :copyable: true 
                  :linenos:

            .. tab:: Flat Example 
               :tabid: flat

               .. include:: /includes/quick-start/facts/auto-embed-flat-example-description.rst

               Select the ``sample_mflix`` database and ``movies`` collection. Then, 
               replace the default index definition with the following:

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/json/flat-auto-embed-example.json
                  :language: json
                  :copyable: true 
                  :linenos:

            .. tab:: Nested Field Example 
               :tabid: nested-root

               .. include:: /includes/index/autoembed-type/facts/nested-root-example-description.rst

               Select the ``sample_airbnb`` database and ``listingsAndReviews`` collection. 
               Then, replace the default index definition with the following:

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/json/nested-auto-embed-example.json
                  :language: json
                  :copyable: true 
                  :linenos:

               .. note:: 

                  It might take some time for the index to build.

   .. include:: /includes/shared/procedures/steps-avs-finish-index-creation.rst
