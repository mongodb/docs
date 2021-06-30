The Versioned API is available in MongoDB 5.0 and later.

Specify an API version by including the ``serverApi`` connection
option and declaring the API version. Currently, the only API version
is ``"1"``.

.. code-block:: javascript

   { serverApi: "1" }
   // or
   { severApi: ServerApiVersion.v1 }

See the MongoDB manual entry on :manual:`Versioned API </reference/versioned-api/>`
for more information.
