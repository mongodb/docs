When you run ``main.go``, it should output the details of the
movie from the sample dataset which will look something like this:

.. code-block:: json

   {
       "_id": "573a1398f29313caabce9682",
       ...
       "title": "Back to the Future",
       ...
   }

If you receive no output or an error, check whether you included the proper
connection string in your ``main.go`` file, and whether you loaded the
sample dataset in your MongoDB Atlas cluster
