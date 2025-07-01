.. procedure::
   :style: normal

   .. step:: Install the MongoDB Ruby Driver.

      a. If you don't already have a ``Gemfile`` for your project, run the
         following command to generate one:

         .. code-block:: sh
            :copyable: true

            bundle init

      #. Add the ``mongo`` gem to your ``Gemfile``:

         .. code-block:: sh
            :copyable: true
            :caption: Gemfile

            gem "mongo"

      #. Run the following command to install the dependency:

         .. code-block:: sh
            :copyable: true

            bundle install

      This installs the latest version of the Ruby driver. For
      alternate installation instructions and version compatibility,
      see the
      :ref:`MongoDB Ruby Driver documentation <installation>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst

      a. Create a file named ``atlas_vector_search_quick_start.rb`` .

      #. Copy and paste the following sample query into the
         ``atlas_vector_search_quick_start.rb`` file:

         .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query.rb
            :language: ruby
            :linenos:


      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run the following command to query your collection:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            bundle exec ruby atlas_vector_search_quick_start.rb

         .. output:: /includes/avs/pipeline-stage-examples/basic-query-nodejs-output.js
            :language: js
            :linenos:
