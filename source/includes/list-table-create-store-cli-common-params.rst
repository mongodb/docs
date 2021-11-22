.. list-table::
   :header-rows: 1
   :widths: 27 10 53 10 

   * - Parameter 
     - Type 
     - Description 
     - Required?

   * - ``createStore``
     - string
     - Name of the new {+data-lake-store+}. The {+data-lake-store+} 
       name must be unique.

       .. include:: /includes/fact-atlas-data-source.rst
       
     - yes

   * - ``provider``
     - string
     - Name of the service where the data is stored. 
       Value can be one of the following: 
       
       - ``s3`` for an |aws| |s3| bucket.
       - ``atlas`` for |service| cluster.
       - ``http`` for files hosted at publicly accessible |url|\s.

     - yes
     