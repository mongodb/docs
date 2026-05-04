.. list-table::
   :header-rows: 1
   :widths: 70 30

   * - Scenario 
     - Linking Method

   * - Keeping related data together will lead to a simpler data 
       model and code.
     - Embedding
   
   * - You have a "has-a" or "contains" relationship between entities. 
     - Embedding 
   
   * - Your application queries pieces of information together. 
     - Embedding 
   
   * - You have data that's often updated together. 
     - Embedding 

   * - You have data that should be archived at the same time. 
     - Embedding 
    
   * - The child side of the relationship has high cardinality.

     - Referencing 

   * - Data duplication is too complicated to manage and not preferred. 
     - Referencing 

   * - The combined size of your data takes up too much memory or transfer 
       bandwidth for your application. 

     - Referencing 

   * - Your embedded data grows without bounds. 
     - Referencing 

   * - Your data is written at different times in a write-heavy workload. 
     - Referencing 

   * - For the child side of the relationship, your data can exist by itself 
       without a parent. 

     - Referencing     
