When you run the ``QuickStart`` class, it should output the details of the 
movie from the sample dataset which resembles the following:

.. code-block:: json

   {
     _id: ...,
     plot: 'A young man is accidentally sent 30 years into the past...',
     genres: [ 'Adventure', 'Comedy', 'Sci-Fi' ],
     ...
     title: 'Back to the Future',
     ...
   }

If you receive no output or an error, check whether you included the proper
connection string in your Java class, and whether you loaded the sample dataset
in your MongoDB Atlas cluster
