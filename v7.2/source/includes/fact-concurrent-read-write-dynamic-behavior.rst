If you use the default value, MongoDB dynamically adjusts the number of tickets 
to optimize performance, with a highest possible value of 128. 
   
Starting in MongoDB 7.0, if you set |wtparam| to a non-default value, it 
disables an algorithm that dynamically adjusts the number of concurrent storage 
engine transactions.
