.. important::

   Once you generate a new client secret, the old client secret expires within 7 days. 
   This expiration period can be shorter depending on the old secret's original expiration date.

   * If the old secret is set to expire more than 7 days after the new one is created, 
     its expiration is shortened to 7 days from the new secret's creation date.
   * If the old secret is set to expire in less than 7 days from the new one's creation 
     date, the original expiration date is maintained.

   To avoid losing access to the {+atlas-admin-api+}, update your application with the 
   new client secret as soon as possible.