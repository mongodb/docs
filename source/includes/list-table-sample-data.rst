.. list-table::
   :header-rows: 1
   :widths: 30 80 

   * - Path to Sample Dataset
     - Description

   * - ``/airbnb/listingsAndReviews/{bedrooms string}/{review_scores.review_scores_rating int}/``
     - This path references the ``airbnb`` dataset, which contains 
       the vacation home listing details and customer reviews. 
       To learn more about this dataset, see :atlas:`Sample AirBnB 
       Listings Dataset </sample-data/sample-airbnb>`.
       
       For this path, {+dl+} utilizes partitions optimized for queries 
       on the ``bedrooms`` field and 
       ``review_scores.review_score_ratings`` field.

   * - ``/analytics/accounts/{limit int}/``
     - This path references the ``analytics`` dataset, which contains 
       data for a typical finanacial services application. To 
       learn more about this dataset, see :atlas:`Sample Analytics 
       Dataset </sample-data/sample-analytics#sample_analytics.accounts>`.

       For this path, {+dl+} utilizes partitions optimized for queries 
       on the ``limit`` field.

   * - ``/analytics/customers/{birthdate isodate}/``
     - This data references the ``analytics`` dataset, which contains 
       collections for a typical finanacial services application. To 
       learn more about this dataset, see :atlas:`Sample Analytics 
       Dataset </sample-data/sample-analytics#sample_analytics.customers>`.

       For this path, {+dl+} utilizes partitions optimized for queries 
       on the ``birthdate`` field.

   * - ``/analytics/transactions/{account_id int}/``
     - This path references the ``analytics`` dataset, which contains 
       data for a typical finanacial services application. To 
       learn more about this dataset, see :atlas:`Sample Analytics 
       Dataset </sample-data/sample-analytics#sample_analytics.transactions>`.

       For this path, {+dl+} utilizes partitions optimized for queries 
       on the ``account_id`` field.

   * - ``/mflix/movies/{type string}/{year int}/``
     - This path references the ``mflix`` dataset, which contains data 
       on movies and movie theaters. To learn more about this dataset, 
       see :atlas:`Sample Mflix Dataset </sample-data/sample-mflix#sample_mflix.movies>`.

       For this path, {+dl+} utilizes partitions optimized for queries 
       on the ``type`` and ``year`` fields.

   * - ``/mflix/sessions.json``
     - This path references the ``mflix`` dataset, which contains data 
       on movies and movie theaters. To learn more about this dataset, 
       see :atlas:`Sample Mflix Dataset </sample-data/sample-mflix#sample_mflix.sessions>`.

       This path does not contain any partition attributes and so, for 
       queries against data in the collection, {+dl+} searches all the 
       files in the collection.

   * - ``/mflix/theaters/{theaterId string}/{location.address.zipcode string}/``
     - This path references the ``mflix`` dataset, which contains data 
       on movies and movie theaters. To learn more about this dataset, 
       see :atlas:`Sample Mflix Dataset </sample-data/sample-mflix#sample_mflix.theaters>`.

       For this path, {+dl+} utilizes partitions optimized for queries 
       on the ``theaterId`` and ``location.address.zipcode`` fields.

   * - ``/mflix/users.json``
     - This path references the ``mflix`` collection, which contains 
       data on movies and movie theaters. To learn more about this 
       dataset, see :atlas:`Sample Mflix Dataset </sample-data/sample-mflix#sample_mflix.users>`.

       This path does not contain any partition attributes and so, for 
       queries against data in the collection, {+dl+} searches all the 
       files in the collection.

   * - ``/nyc-yellow-cab-trips/{trip_start_isodate isodate}/{passenger_count int}/{fare_type string}/``
     - The path references the ``nyc-yellow-cab-trips`` dataset, which 
       contains data on the trips, including trip date, fare, and 
       number of passengers. 

       For this path, {+dl+} utilizes partitions optimized for queries 
       on the ``trip_start_isodate``, ``passenger_count``, and 
       ``fare_type`` fields.
