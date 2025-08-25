Request Authentication
~~~~~~~~~~~~~~~~~~~~~~

You can authenticate an outbound HTTP request using one of the standard
:mdn:`HTTP authentication schemes <Web/HTTP/Authentication>`. Atlas App Services
supports the following authentication schemes:

Basic Authentication
````````````````````

HTTP :wikipedia:`basic authentication <Basic_access_authentication>`
requires that incoming requests include a valid username and password
for the requested service. You can specify the user credentials in the
``username`` and ``password`` fields of the request document, directly
in a ``url`` string, or in an :mdn:`Authorization
<Web/HTTP/Headers/Authorization>` HTTP header.

.. example::
   
   The following examples demonstrate three equivalent ways to
   authenticate an HTTP service request using basic authentication. The
   examples all use the username ``MyUser`` and the password
   ``Mypassw0rd``. You would pass one of these objects as an argument to
   the given HTTP method.
   
   .. code-block:: json
      :caption: Specify Credentials Directly (Best Method)
      :emphasize-lines: 3, 4
      
      {
        "scheme": "https",
        "username": "MyUser",
        "password": "Mypassw0rd",
        "domain": "www.example.com"
      }
   
   .. code-block:: json
      :caption: Embed Credentials in the URL
      
      {
        "url": "https://MyUser:Mypassw0rd@www.example.com"
      }
   
   .. code-block:: javascript
      :caption: Include an Authorization Header
      
      {
        "url": "https://www.example.com",
        "headers": {
          "Authorization": [
            `Basic ${BSON.Binary.fromText("MyUser:Mypassw0rd").toBase64()}`
          ]
        }
      }
      
Digest Authentication
`````````````````````

HTTP :wikipedia:`digest authentication <Digest_access_authentication>`
requires that incoming requests include an authorization key based on a
random :wikipedia:`nonce <Cryptographic_nonce>` value returned from the
server. App Services can automatically construct the key and authorize requests
given a valid username and password.

To configure a request to use digest authentication, set the
``digestAuth`` field to ``true`` and specify the user credentials in the
``username`` and ``password`` fields of the request document or directly
in a ``url`` string.

.. example::
   
   The following examples demonstrate two equivalent ways to
   authenticate an HTTP service request using digest authentication. The
   examples all use the username ``MyUser`` and the password
   ``Mypassw0rd``.

   .. code-block:: json
      :caption: Specify Credentials Directly (Best Method)
      :emphasize-lines: 3, 4, 6
      
      {
        "scheme": "https",
        "username": "MyUser",
        "password": "Mypassw0rd",
        "domain": "www.example.com",
        "digestAuth": true
      }
      
   .. code-block:: json
      :caption: Embed Credentials in the URL
      
      {
        "url": "https://MyUser:Mypassw0rd@www.example.com",
        "digestAuth": true
      }
