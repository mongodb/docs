.. procedure::
   :style: normal

   .. step:: Install the MongoDB Ruby Driver.

      a. If you don't already have a ``Gemfile`` for your project, run the
         following command from your project directory to generate one:

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
      :ref:`MongoDB Ruby Driver documentation <ruby-quick-start-download-and-install>`.

   .. step:: Create a file named ``vector_index.rb``.

   .. step:: Copy and paste the following sample code into the ``vector_index.rb`` file.

      .. literalinclude:: /includes/quick-start/code-snippets/vector/ruby/basic-example.rb
         :language: ruby
         :copyable: true
         :caption: vector_index.rb
         :emphasize-lines: 4
         :linenos:

   .. step:: Specify the ``<connection-string>.``

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Run the program.

      .. code-block:: sh
         :copyable: true

         bundle exec ruby vector_index.rb
