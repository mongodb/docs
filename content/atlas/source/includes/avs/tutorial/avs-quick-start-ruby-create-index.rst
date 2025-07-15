a. Create a file named ``atlas_vector_search_index.rb``.

#. Copy and paste the following sample query into the
   ``atlas_vector_search_index.rb`` file: 

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example.rb
      :language: ruby
      :copyable: true
      :caption: vector_index.rb
      :emphasize-lines: 4
      :linenos:

#. Specify the ``<connection-string>.``

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Run the program.

   .. code-block:: javascript 

      bundle exec ruby atlas_vector_search_index.rb
