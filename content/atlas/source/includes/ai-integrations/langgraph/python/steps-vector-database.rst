.. procedure::
   :style: normal

   .. step:: Load the sample data.

      For this tutorial, you use one of our sample datasets as the 
      data source. If you haven't already, complete the steps to 
      :ref:`load sample data into your Atlas {+cluster+} <sample-data>`.

      Specifically, you will use the :ref:`embedded_movies 
      <mflix-embedded_movies>` dataset, which contains documents 
      about movies, including the vector embeddings of their plots.

      .. include:: /includes/avs/facts/fact-avs-integrations-own-data.rst

   .. step:: Set up the vector store and indexes.

      Create a file named ``config.py`` in your project. This file 
      configures MongoDB as the vector store for your agent.
      It also creates the indexes to enable vector search and full-text 
      search queries on the sample data.

      .. collapsible::
         :heading: config.py
         :sub_heading: Copy and paste the following code into your config.py file.
         :expanded: false
        
         .. literalinclude:: /includes/ai-integrations/langgraph/python/config.py
            :language: python
            :copyable:
            