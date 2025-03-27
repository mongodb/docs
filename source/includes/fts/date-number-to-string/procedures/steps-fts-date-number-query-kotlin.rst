.. procedure:: 
   :style: normal

   .. step:: Ensure that you add the following dependency to your project.

      .. list-table::
         :widths: 30 70 

         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version

   .. step:: Create a file named ``DateNumberToStringQuery.kt``.

   .. step:: Copy and paste the code for the operator for which you created the index into the ``DateNumberToStringQuery.kt`` file.
 
      .. include:: /includes/fts/extracts/fts-query-intro.rst 

      .. tabs::

         .. tab:: queryString Operator 
            :tabid: querystring

            .. include:: /includes/fts/extracts/fts-kotlin-query-desc.rst

            .. tabs::

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/fts/extracts/fts-and-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-and-query.kt
                     :language: kotlin
                     :linenos:
                     :dedent:
                     :emphasize-lines: 10

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/fts/extracts/fts-or-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-or-query.kt
                     :language: kotlin
                     :linenos:
                     :dedent:
                     :emphasize-lines: 11

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. include:: /includes/fts/extracts/fts-kotlin-query-desc.rst

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/fts/extracts/fts-date-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-date-to-string-query.kt
                     :language: kotlin
                     :linenos:
                     :dedent:
                     :emphasize-lines: 10

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/fts/extracts/fts-numeric-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-number-to-string-query.kt
                     :language: kotlin
                     :linenos:
                     :dedent:
                     :emphasize-lines: 10

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the ``DateNumberToStringQuery.kt`` file.

      .. tabs:: 
         :hidden: true

         .. tab:: queryString Operator 
            :tabid: querystring

            .. tabs:: 
               :hidden: true

               .. tab:: AND Query 
                  :tabid: and-query

                  When you run the ``DateNumberToStringQuery.kt`` program in your IDE, it prints
                  the following documents:
                  
                  .. code-block:: none
                     :copyable: false
                  
                     Document{{lastScrapedDate=2019-03-06, propertyName=Tropical Jungle Oasis, propertyType=Condominium, accommodatesNumber=4, maximumNumberOfNights=1125}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Honolulu 1 BR/1Bath Condo - Hilton Hawaiian, propertyType=Condominium, accommodatesNumber=4, maximumNumberOfNights=7}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Beautiful Apt, Tropical Resort, Steps to the Beach, propertyType=Condominium, accommodatesNumber=4, maximumNumberOfNights=45}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Ocean View in the heart of Waikiki, propertyType=Condominium, accommodatesNumber=4, maximumNumberOfNights=1125}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Aloha, Kihei Bay Surf, New Pool and BBQ, propertyType=Condominium, accommodatesNumber=4, maximumNumberOfNights=1125}}

               .. tab:: OR Query 
                  :tabid: or-query 

                  When you run the ``DateNumberToStringQuery.kt`` program in your IDE, it prints
                  the following documents:
                  
                  .. code-block:: none
                     :copyable: false
                  
                     Document{{lastScrapedDate=2019-03-11, propertyName=This room is perfect for responsible guests, propertyType=House, accommodatesNumber=2, maximumNumberOfNights=30}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Queen Room at Beautiful Upscale Organic Farm, propertyType=House, accommodatesNumber=2, maximumNumberOfNights=30}}
                     Document{{lastScrapedDate=2019-03-11, propertyName=Incredible space with amazing views, propertyType=House, accommodatesNumber=2, maximumNumberOfNights=30}}
                     Document{{lastScrapedDate=2019-02-16, propertyName=Varanda Porto, propertyType=House, accommodatesNumber=2, maximumNumberOfNights=30}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Bright, Clean, Quiet, Modern, propertyType=House, accommodatesNumber=2, maximumNumberOfNights=30}}

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. tabs:: 
               :hidden: true

               .. tab:: Year Search
                  :tabid: yearquery

                  When you run the ``DateNumberToStringQuery.kt`` program in your IDE, it prints
                  the following documents:
                  
                  .. code-block:: none
                     :copyable: false
                  
                     Document{{lastScrapedDate=2019-03-07, propertyName=Deluxe Loft Suite, propertyType=Apartment, accommodatesNumber=4, maximumNumberOfNights=1125}}
                     Document{{lastScrapedDate=2019-03-11, propertyName=3 chambres au coeur du Plateau, propertyType=Apartment, accommodatesNumber=6, maximumNumberOfNights=1125}}
                     Document{{lastScrapedDate=2019-02-16, propertyName=Be Happy in Porto, propertyType=Loft, accommodatesNumber=2, maximumNumberOfNights=1125}}
                     Document{{lastScrapedDate=2019-02-18, propertyName=Cozy house at Beyoğlu, propertyType=Apartment, accommodatesNumber=2, maximumNumberOfNights=1125}}
                     Document{{lastScrapedDate=2019-02-16, propertyName=Downtown Oporto Inn (room cleaning), propertyType=Hostel, accommodatesNumber=2, maximumNumberOfNights=1125}}

               .. tab:: Number Search
                  :tabid: numericquery

                  When you run the ``DateNumberToStringQuery.kt`` program in your IDE, it prints
                  the following documents:
                  
                  .. code-block:: none
                     :copyable: false

                     Document{{lastScrapedDate=2019-03-06, propertyName=Ocean View Waikiki Marina w/prkg, propertyType=Condominium, accommodatesNumber=2, maximumNumberOfNights=365}}
                     Document{{lastScrapedDate=2019-03-07, propertyName=New York City - Upper West Side Apt, propertyType=Apartment, accommodatesNumber=2, maximumNumberOfNights=360}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=~Ao Lele~ Flying Cloud, propertyType=Treehouse, accommodatesNumber=2, maximumNumberOfNights=30}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Banyan Bungalow, propertyType=Bungalow, accommodatesNumber=2, maximumNumberOfNights=300}}
                     Document{{lastScrapedDate=2019-03-06, propertyName=Luxury 1-Bdrm in Downtown Brooklyn, propertyType=Apartment, accommodatesNumber=2, maximumNumberOfNights=30}}
