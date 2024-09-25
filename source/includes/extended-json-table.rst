.. list-table::
   :header-rows: 1
   :widths: 20, 40, 40

   * - JSON Format
     - Description
     - Sample Document 

   * - Default Extended JSON
     - A string format that avoids any loss of BSON type information. This 
       is the default |compass-short| setting.  
     - 
       .. code-block:: javascript 

          { 
            "fortyTwo" : 42, 
            "oneHalf" : 0.5, 
            "bignumber" : { 
              "$numberLong" : "5000000000" 
            } 
          }

   * - Relaxed Extended JSON
     - A string format that emphasizes readability and interoperability at 
       the expense of type preservation. That is, conversion from relaxed 
       format to BSON can lose type information.
        
       :red:`WARNING:` This format is not recommended for data integrity. 
      
     - 
       .. code-block:: javascript 

          { 
            "fortyTwo" : 42, 
            "oneHalf": 0.5, 
            "bignumber" : 5000000000 
          }

   * - Canonical Extended JSON
     - A string format that emphasizes type preservation at the expense of 
       readability and interoperability. That is, conversion from canonical 
       to BSON will generally preserve type information except in certain 
       specific cases.

     - 
       .. code-block:: javascript 

          { 
            "fortyTwo" : { 
              "$numberInt" : "42" 
            }, 
            "oneHalf" : { 
              "$numberDouble" : "0.5" 
            }, 
            "bignumber" : { 
              "$numberLong" : "5000000000" 
            } 
          }
                   