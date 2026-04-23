.. procedure:: 
   :style: normal

   .. step:: Create a file named ``atlas_vector_search_index.rb``.

   .. step:: Copy and paste the following sample code into the ``atlas_vector_search_index.rb`` file.

   .. literalinclude:: /includes/quick-start/code-snippets/ruby/basic-example.rb
      :language: ruby
      :copyable: true
      :caption: vector_index.rb
      :emphasize-lines: 4
      :linenos:

   .. step:: Specify the ``<connection-string>.``

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Run the program.

      .. code-block:: javascript 

         bundle exec ruby atlas_vector_search_index.rb
