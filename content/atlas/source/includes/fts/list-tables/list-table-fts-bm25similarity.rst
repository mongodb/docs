.. list-table:: 
   :widths: 10 90 
   :stub-columns: 1

   * - ``boost``
     - Increase the importance of the term.
   
   * - ``freq`` 
     - Frequency of the query term. 

   * - ``idf`` 
     - Inverse document frequency of the query. |fts| computes the
       frequency using the following formula: 

       .. code-block:: 
          :copyable: false 

          log(1 + (N - n + 0.5) / (n + 0.5))

       where:

       - ``N`` is the total number of documents with the field.
       - ``n`` is the number of documents containing the term.

   * - ``tf`` 
     - Term frequency. |fts| computes the frequency using the following
       formula:  

       .. code-block:: 
          :copyable: false  

          freq / (freq + k1 * (1 - b + b * dl / avgdl))

       where: 

       - ``freq`` is the number of occurrences of the term within the
         document. 
       - ``k1`` is the term saturation parameter that is specified 
         internally. It affects how much the score increases with each
         reoccurrence of the term. 
       - ``avgdl`` is the average length of the field across all
         documents. 
       - ``dl`` is the length of the field in the document.
       - ``b`` is the length normalization parameter that is also set
         internally. ``b`` is multiplied by the ratio of ``dl`` to
         ``avgdl``. If ``b`` increases, the effects of the ratio of 
         ``dl`` to ``avgdl`` is amplified.
