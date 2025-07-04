<<<<<<<< HEAD:source/includes/fts/geo/procedures/steps-fts-tutorial-run-geo-query-compass.yaml
stepnum: 1
title: "Connect to your cluster in |compass|."
ref: connect-to-database-deployment-fts-compass
content: |

  Open |compass| and
  connect to your {+cluster+}. For detailed instructions on connecting,
  see :ref:`atlas-connect-via-compass`.
---
stepnum: 2
title: "Use the ``listingsAndReviews`` collection in the ``sample_airbnb`` database."
ref: use-sample-airbnb-compass
content: |

  On the :guilabel:`Database` screen, click the ``sample_airbnb``
  database, then click the ``listingsAndReviews`` collection.

---
stepnum: 3
title: "Run an |fts| query on the ``listingsAndReviews`` collection."
ref: run-geo-query-compass
content: |

  The following query:

  .. include:: /includes/fts/facts/fact-fts-tutorial-run-geo-query-results.rst

  To run this |fts| query in |compass|:

  a. Click the :guilabel:`Aggregations` tab.
  #. Click :guilabel:`Select...`, then configure each of the following 
     pipeline stages by selecting the stage from the dropdown and adding
     the query for that stage. Click :guilabel:`Add Stage` to add 
     additional stages.

     .. list-table::
        :header-rows: 1
        :widths: 25 75

        * - Pipeline Stage
          - Query

        * - ``$search``
          - .. code-block:: javascript

               {
                   'index': 'geo-json-tutorial',
                   'compound': {
                     'must': [
                       {
                         'geoWithin': {
                           'geometry': {
                             'type': 'Polygon', 
                             'coordinates': [
                               [
                                 [
                                   -161.323242, 22.512557
                                 ], [
                                   -152.446289, 22.065278
                                 ], [
                                   -156.09375, 17.811456
                                 ], [
                                   -161.323242, 22.512557
                                 ]
                               ]
                             ]
                           }, 
                           'path': 'address.location'
                         }
                       }
                     ], 
                     'should': [
                       {
                         'text': {
                           'path': 'property_type', 
                           'query': 'Condominium'
                         }
                       }
                     ]
                   }
               }

        * - ``$limit``
          - .. code-block:: javascript

               10

        * - ``$project``
          - .. code-block:: javascript

               {
                '_id': 0, 
                'name': 1, 
                'address': 1, 
                'property_type': 1, 
                'score': {
                  '$meta': 'searchScore'
                }
               }

  If you enabled :guilabel:`Auto Preview`, |compass| displays the 
  following documents next to the ``$project``
  pipeline stage:


  .. code-block:: json
     :copyable: false
     :linenos:

     {
========
[
    {
>>>>>>>> 44b896764 (DOCSP-47238 Performance Options reference section + tutorial example migration):source/includes/fts/geo/shell-query-output.js
       name: 'Ocean View Waikiki Marina w/prkg',
       property_type: 'Condominium',
       address: {
         street: 'Honolulu, HI, United States',
         suburb: 'Oʻahu',
         government_area: 'Primary Urban Center',
         market: 'Oahu',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -157.83919, 21.28634 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: 'LAHAINA, MAUI! RESORT/CONDO BEACHFRONT!! SLEEPS 4!',
       property_type: 'Condominium',
       address: {
         street: 'Lahaina, HI, United States',
         suburb: 'Maui',
         government_area: 'Lahaina',
         market: 'Maui',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -156.68012, 20.96996 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: 'Makaha Valley Paradise with OceanView',
       property_type: 'Condominium',
       address: {
         street: 'Waianae, HI, United States',
         suburb: 'Leeward Side',
         government_area: 'Waianae',
         market: 'Oahu',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -158.20291, 21.4818 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: 'March 2019 availability! Oceanview on Sugar Beach!',
       property_type: 'Condominium',
       address: {
         street: 'Kihei, HI, United States',
         suburb: 'Maui',
         government_area: 'Kihei-Makena',
         market: 'Maui',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -156.46881, 20.78621 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: 'Tropical Jungle Oasis',
       property_type: 'Condominium',
       address: {
         street: 'Hilo, HI, United States',
         suburb: 'Island of Hawaiʻi',
         government_area: 'South Hilo',
         market: 'The Big Island',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -155.09259, 19.73108 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: '2 Bdrm/2 Bath  Family Suite Ocean View',
       property_type: 'Condominium',
       address: {
         street: 'Honolulu, HI, United States',
         suburb: 'Waikiki',
         government_area: 'Primary Urban Center',
         market: 'Oahu',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -157.82696, 21.27971 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: '302 Kanai A Nalu Ocean front/view',
       property_type: 'Condominium',
       address: {
         street: 'Wailuku, HI, United States',
         suburb: 'Maui',
         government_area: 'Kihei-Makena',
         market: 'Maui',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -156.5039, 20.79664 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: 'Sugar Beach Resort 1BR Ground Floor Condo !',
       property_type: 'Condominium',
       address: {
         street: 'Kihei, HI, United States',
         suburb: 'Maui',
         government_area: 'Kihei-Makena',
         market: 'Maui',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -156.46697, 20.78484 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: '2 BR Oceanview - Great Location!',
       property_type: 'Condominium',
       address: {
         street: 'Kihei, HI, United States',
         suburb: 'Kihei/Wailea',
         government_area: 'Kihei-Makena',
         market: 'Maui',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -156.44917, 20.73013 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
     },
     {
       name: 'PALMS AT WAILEA #905-2BR-REMODELED-LARGE LANAI-AC',
       property_type: 'Condominium',
       address: {
         street: 'Kihei, HI, United States',
         suburb: 'Maui',
         government_area: 'Kihei-Makena',
         market: 'Maui',
         country: 'United States',
         country_code: 'US',
         location: {
           type: 'Point',
           coordinates: [ -156.4409, 20.69735 ],
           is_location_exact: true
         }
       },
       score: 2.238388776779175
    }
]