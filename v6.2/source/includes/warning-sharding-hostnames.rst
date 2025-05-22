.. warning:: 

   *Sharding and "localhost" Addresses*
   
   If you set the hostname portion of any host identifier as 
   ``localhost`` or its associated IP address, then you must use that identifier 
   for *all* host settings for any MongoDB instances in the cluster. 
   
   Mixing localhost and remote host addresses results in connectivity errors.
