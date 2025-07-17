.. important:: Percent-Encoding

   You must :wikipedia:`percent-encode <Percent-encoding>` a username and password before
   you include them in a MongoDB URI. The ``quote_plus()`` method, available in the 
   `urllib.parse <https://docs.python.org/3/library/urllib.parse.html#urllib.parse.quote_plus>`__
   module, is one way to perform this task. For example, calling ``quote_plus("and / or")``
   returns the string ``and+%2F+or``.

   Don't percent-encode the username or password when passing them as arguments to
   ``MongoClient``.