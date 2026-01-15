.. list-table::
   :widths: 15 15 15 55
   :header-rows: 1

   * - Option
     - Type 
     - Necessity
     - Purpose

   * - ``fields``
     - Array of field definition documents 
     - Required 
     - Definitions for the vector and filter fields to index, one
       definition per document. Each field definition document specifies
       the ``type``, ``path``, and other configuration options for the
       field to index.
       
       The ``fields`` array must contain one ``autoEmbed`` type
       field definition. You can add additional ``filter``-type field
       definitions to your array to pre-filter your data.  
       
   * - | ``fields.``
       | ``type``
     - String 
     - Required 
     - Field type to use to index fields for :pipeline:`$vectorSearch`.
       You can specify one of the following values:  

       - ``autoEmbed`` - for automatically generating vector embeddings.       
       - ``filter`` - for pre-filtering documents by non-vector fields. You
         can filter on {+avs-filter-types+}.

       To learn more, see :ref:`avs-types-auto-embed` and
       :ref:`avs-types-filter`. 

   * - | ``fields.``
       | ``path``
     - String 
     - Required 
     - Name of the text field to index. For nested fields, use dot notation
       to specify the path to embedded fields. If the text value in the 
       specified field exceeds 32,000 tokens, {+avs+} automatically 
       truncates during indexing to fit the context window of the embedding 
       model.

   * - | ``fields.``
       | ``modality``
     - string
     - Required
     - Type of data in the field that you specified in the ``path``.
       Value must be ``text``.

   * - | ``fields.``
       | ``model``
     - string
     - Required
     - |voyage| embedding model to use for generating the embeddings. 
       You can specify one of the following models:

       - ``voyage-4-lite`` - Optimized for high-volume, cost-sensitive 
         applications. 
       - ``voyage-4`` - (**Recommended**) Balanced performance for general 
         text search.
       - ``voyage-4-large`` - Maximum accuracy for complex semantic 
         relationships.
       - ``voyage-code-3`` - Specialized for code search and technical 
         documentation.