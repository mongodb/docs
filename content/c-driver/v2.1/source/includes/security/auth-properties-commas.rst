.. important::

   You cannot specify a property value containing the comma (``,``) character
   as a ``authMechanismProperties`` connection string option, even when the 
   comma character is percent-encoded. To specify an ``authMechanismProperties``
   property value that contains a comma, set the option by using the
   `mongoc_uri_set_mechanism_properties() <{+api-libmongoc+}/mongoc_uri_set_mechanism_properties.html>`__
   method.