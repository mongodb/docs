.. list-table:: 
   :widths: 30 70 
   :header-rows: 1

   * - Factor
     - Description

   * - ``boost``
     - Factor specified at query time using the query operator's
       ``score.boost`` option. You can set ``boost`` to a positive
       number or the value of a numeric field in the documents. To learn
       more, see :ref:`boost <scoring-boost>`.

   * - ``tf``
     - Decaying function. |fts| computes the decaying function using the
       following formula:  

       .. code-block:: 
          :copyable: false

          tf = freq / (freq + k1)

       where:

       - ``freq`` is the frequency of the query term in a document.
       - ``k1`` is the internally specified term saturation parameter.
         It affects how much the score increases with each reoccurrence
         of the term. 

   * - ``tr``
     - Term rarity. |fts| computes the term rarity using the following 
       formula:

       .. code-block::
          :copyable: false

          tr = log(1 + (1 - p + 0.05)/(p + 0.05))

       where:

       - ``p`` is the probability of the query term appearing in the
         document based on the term length. This is based on **Zipf's
         law**, which states that longer words appear less frequently.
         To determine term rarity, MongoDB uses a decaying function
         based on term length.

   * - ``p``
     - Probability function based on **Zipf's law**. |fts| computes the
       probability of the query term appearing in the document using the
       following formula:

       .. code-block::
          :copyable: false
         
          p = 1 - (1 - m * 2 ^ (-c * tl)) ^ dl
      
       where:

       - ``m`` is the internally specified multiplicative constant to
         term probability.
       - ``c`` is the internally specified decaying constant. It
         controls how fast ``p`` decreases as term length increases.
       - ``tl`` is the length of the query term, measured in unicode codepoints.
       - ``dl`` is the length of document d, measured in tokens.