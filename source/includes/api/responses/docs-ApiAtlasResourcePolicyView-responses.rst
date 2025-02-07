.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description
 
   * - id
     - string
     - Unique 24-hexadecimal character string that identifies the {+arp+}.

   * - version
     - string
     - Identifies the version of the {+arp+}. For example, ``v1``.

   * - orgId
     - string
     - Unique 24-hexadecimal digit string that identifies the 
       organization that owns this {+arp+}.
 
   * - name
     - string
     - Label that describes the {+arp+}.

   * - policies
     - string array
     - List of policies in {+cedar+}, each with its own ID, that make up the {+arp+}.

   * - createdDate
     - timestamp
     - Date and time in UTC when the {+arp+} was created.
  
   * - lastUpdatedDate 
     - timestamp
     - Date and time in UTC when the {+arp+} was last updated. 

   * - createdByUser
     - object
     - The public |api| key and ID of the user who created the {+arp+}.
   
   * - lastUpdatedByUser
     - object
     - The public |api| key and ID of the user who last updated the {+arp+}. 