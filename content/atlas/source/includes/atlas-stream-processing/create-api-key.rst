The :oas-bump-atlas-op:`Create One Connection <creategroupstreamconnection>` 
API endpoint requires digest authorization when creating a Kinesis connection. 
To support this, you must create an API Key.

a. In the :guilabel:`Project Access Manager`, select the :guilabel:`Applications`
   tab, then click :guilabel:`API Keys`.

b. Click :guilabel:`Create API Key`. Provide a short description for the key.

c. In the :guilabel:`Project Permissions` dropdown menu, select both the 
   :guilabel:`Project Stream Processing Owner` and
   :guilabel:`Project Owner` roles. Click :guilabel:`Next`.

d. Save both the public and private keys to use later in this procedure.