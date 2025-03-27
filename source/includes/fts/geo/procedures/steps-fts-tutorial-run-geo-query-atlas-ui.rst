.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Go to the :guilabel:`Search Tester`.
      
      Click the :guilabel:`Query` button to the right of the index to 
      query.
      
   .. step:: View and edit the query syntax.
      
      Click :guilabel:`Edit Query` to view a default query syntax 
      sample in |json| format.
      
   .. step:: Run an |fts| :ref:`compound-ref` query with the ``geoWithin`` operator on the ``sample_airbnb.listingsAndReviews`` collection.
      
      The following |fts| query uses the :ref:`compound-ref` operator to: 
      
      - Specify that results ``must`` be within a ``Polygon`` defined by a
        set of ``coordinates``. 
      
      - Give preference to results for properties of type ``condominium``.
      
      .. note:: 
      
         .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
      
      .. io-code-block::  
         :copyable: true 
      
         .. input:: 
            :language: json 
      
            [
              {
                "$search": {
                  "index": "geo-json-tutorial",
                  "compound": {
                    "must": [{
                      "geoWithin": {
                        "geometry": {
                          "type": "Polygon",
                            "coordinates": [[[ -161.323242, 22.512557 ],
                                 [ -152.446289, 22.065278 ],
                                 [ -156.09375, 17.811456 ],
                                 [ -161.323242, 22.512557 ]]]
                        },
                        "path": "address.location"
                      }
                    }],
                    "should": [{
                      "text": {
                        "path": "property_type",
                        "query": "Condominium"
                      }
                    }]
                  }
                }
              }
            ]
      
         .. output:: 
            :linenos:  
      
            SCORE: 2.238388776779175  _id:  "1001265"
              listing_url: "https://www.airbnb.com/rooms/1001265"
              name: "Ocean View Waikiki Marina w/prkg"
              summary: "A short distance from Honolulu's billion dollar mall,
              and the same dis…"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Honolulu, HI, United States"
                suburb: "Oʻahu"
                government_area: "Primary Urban Center"
                market: "Oahu"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -157.83919
                    1: 21.28634
                  is_location_exact: true
              ...
           
            SCORE: 2.238388776779175  _id:  "10227000"
              listing_url: "https://www.airbnb.com/rooms/10227000"
              name: "LAHAINA, MAUI! RESORT/CONDO BEACHFRONT!! SLEEPS 4!"
              summary: "THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE BEAUTIF…"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Lahaina, HI, United States"
                suburb: "Maui"
                government_area: "Lahaina"
                market: "Maui"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -156.68012
                    1: 20.96996
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "10266175"
              listing_url: "https://www.airbnb.com/rooms/10266175"
              name: "Makaha Valley Paradise with OceanView"
              summary: "A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha …"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Waianae, HI, United States"
                suburb: "Leeward Side"
                government_area: "Waianae"
                market: "Oahu"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -158.20291
                    1: 21.4818
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "1042446"
              listing_url: "https://www.airbnb.com/rooms/1042446"
              name: "March 2019 availability! Oceanview on Sugar Beach!"
              summary: ""
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Kihei, HI, United States"
                suburb: "Maui"
                government_area: "Kihei-Makena"
                market: "Maui"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -156.46881
                    1: 20.78621
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "10527243"
              listing_url: "https://www.airbnb.com/rooms/10527243"
              name: "Tropical Jungle Oasis"
              summary: "2 bedrooms, one with a queen sized bed, one with 2 single beds. 1 and …"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Hilo, HI, United States"
                suburb: "Island of Hawaiʻi"
                government_area: "South Hilo"
                market: "The Big Island"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -155.09259
                    1: 19.73108
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "1104768"
              listing_url: "https://www.airbnb.com/rooms/1104768"
              name: "2 Bdrm/2 Bath  Family Suite Ocean View"
              summary: "This breathtaking 180 degree view of Waikiki is one of a kind. You wil…"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Honolulu, HI, United States"
                suburb: "Waikiki"
                government_area: "Primary Urban Center"
                market: "Oahu"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -157.82696
                    1: 21.27971
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "11207193"
              listing_url: "https://www.airbnb.com/rooms/11207193"
              name: "302 Kanai A Nalu Ocean front/view"
              summary: "Welcome to Kana'i A Nalu a quiet resort that sits on the ocean away fr…"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Wailuku, HI, United States"
                suburb: "Maui"
                government_area: "Kihei-Makena"
                market: "Maui"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -156.5039
                    1: 20.79664
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "11319047"
              listing_url: "https://www.airbnb.com/rooms/11319047"
              name: "Sugar Beach Resort 1BR Ground Floor Condo !"
              summary: "The Sugar Beach Resort enjoys a beachfront setting fit for a postcard."
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Kihei, HI, United States"
                suburb: "Maui"
                government_area: "Kihei-Makena"
                market: "Maui"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -156.46697
                    1: 20.78484
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "11695887"
              listing_url: "https://www.airbnb.com/rooms/11695887"
              name: "2 BR Oceanview - Great Location!"
              summary: "Location, location, location... This is a great 2 bed, 2 bath condo is…"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Kihei, HI, United States"
                suburb: "Kihei/Wailea"
                government_area: "Kihei-Makena"
                market: "Maui"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -156.44917
                    1: 20.73013
                  is_location_exact: true
              ...
      
            SCORE: 2.238388776779175  _id:  "11817249"
              listing_url: "https://www.airbnb.com/rooms/11817249"
              name: "PALMS AT WAILEA #905-2BR-REMODELED-LARGE LANAI-AC"
              summary: "Book with confidence this stunning 2 bedroom, 2 bathroom condo at the …"
              ...
              property_type: "Condominium"
              ...
              address: Object
                street: "Kihei, HI, United States"
                suburb: "Maui"
                government_area: "Kihei-Makena"
                market: "Maui"
                country: "United States"
                country_code: "US"
                location: Object
                  type: "Point"
                  coordinates: Array
                    0: -156.4409
                    1: 20.69735
                  is_location_exact: true
              ...     
