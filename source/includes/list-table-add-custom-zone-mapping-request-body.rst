.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description
       
   * - ``customZoneMappings``
     - document array
     - Each document in the array maps one ISO location code to a zone
       in your |global-write-cluster|. 

   * - ``customZoneMappings[n].location``
     - string
     - *Required* The ISO location code to which you want to map a zone
       in your |global-write-cluster|. You can find a list of all supported
       location codes `here <https://cloud.mongodb.com/static/atlas/country_iso_codes.txt>`_.

   * - ``customZoneMappings[n].zone``
     - string
     - *Required* The name of the zone in your |global-write-cluster| that you want to map
       to ``location``.