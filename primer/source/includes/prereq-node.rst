In the ``node`` shell, define the following variables to access the
required modules as well as to initialize ``url`` to the
:manual:`MongoDB uri </reference/connection-string>`.

.. code-block:: javascript

   var MongoClient = require('mongodb').MongoClient;
   var assert = require('assert')
   var ObjectId = require('mongodb').ObjectID;
   var url = 'mongodb://localhost:27017/test';
