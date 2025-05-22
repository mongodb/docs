.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         This page provides examples of |query_operations| using the
         :method:`db.collection.find()` method in
         :binary:`~bin.mongosh`. The examples on this page use the
         ``inventory`` collection. To populate the ``inventory``
         collection, run the following:

     - id: compass
       content: |
         This page provides examples of |query_operations| using
         :ref:`MongoDB Compass <compass-index>`. The examples on this
         page use the ``inventory`` collection. Populate the
         ``inventory`` collection with the following documents:

     - id: python
       content: |
         This page provides examples of |query_operations| using the
         :py:meth:`pymongo.collection.Collection.find` method in the
         :api:`PyMongo <pymongo>`
         Python driver. The examples on this page use the ``inventory``
         collection. To populate the ``inventory`` collection, run the
         following:

     - id: motor
       content: |
         This page provides examples of |query_operations| using the
         :py:meth:`motor.motor_asyncio.AsyncIOMotorCollection.find`
         method in the `Motor <https://motor.readthedocs.io/en/stable/>`_
         driver. The examples on this page use the ``inventory``
         collection. To populate the ``inventory`` collection, run the
         following:

     - id: java-sync
       content: |
         This page provides examples of |query_operations| using the
         com.mongodb.client.MongoCollection.find_ method in the MongoDB
         `Java Synchronous Driver`_.

         .. tip::

            The driver provides com.mongodb.client.model.Filters_
            helper methods to facilitate the creation of filter
            documents. The examples on this page use these methods to
            create the filter documents.

         The examples on this page use the ``inventory``
         collection. To populate the ``inventory`` collection, run the
         following:

     - id: java-async
       content: |
         This page provides examples of |query_operations| using the
         `com.mongodb.reactivestreams.client.MongoCollection.find <http://mongodb.github.io/mongo-java-driver-reactivestreams/1.6/javadoc/com/mongodb/reactivestreams/client/MongoCollection.html#find()>`_
         method in the MongoDB `Java Reactive Streams Driver <http://mongodb.github.io/mongo-java-driver-reactivestreams/1.6/>`_.

         The examples on this page use the ``inventory``
         collection. To populate the ``inventory`` collection, run the
         following:

     - id: nodejs
       content: |
         This page provides examples of |query_operations| using the
         :node-api:`Collection.find() <Collection.html#find>` method in
         the :node-docs:`MongoDB Node.js Driver <>`.
         The examples on this page use the ``inventory`` collection. To
         populate the ``inventory`` collection, run the following:

     - id: php
       content: |
         This page provides examples of |query_operations| using the
         :phpmethod:`MongoDB\\Collection::find() <phpmethod.MongoDB\\Collection::find>`
         method in the
         `MongoDB PHP Library <https://docs.mongodb.com/php-library/master/>`_.
         The examples on this page use the ``inventory`` collection. To
         populate the ``inventory`` collection, run the following:

     - id: perl
       content: |
         This page provides examples of |query_operations| using the
         :perl-api:`MongoDB::Collection::find()<Collection#find>` method
         in the
         `MongoDB Perl Driver <https://metacpan.org/release/MongoDB>`_.
         The examples on this page use the ``inventory`` collection. To
         populate the ``inventory`` collection, run the following:

     - id: ruby
       content: |
         This page provides examples of |query_operations| using the
         :ruby-api:`Mongo::Collection#find()<Collection.html#find-instance_method>`
         method in the
         `MongoDB Ruby Driver <https://docs.mongodb.com/ruby-driver/master/>`_.
         The examples on this page use the ``inventory`` collection. To
         populate the ``inventory`` collection, run the following:

     - id: scala
       content: |
         This page provides examples of |query_operations| using the
         :scala-api:`collection.find()<find[C](filter:org.mongodb.scala.bson.conversions.Bson)(implicite:org.mongodb.scala.bson.DefaultHelper.DefaultsTo[C,TResult],implicitct:scala.reflect.ClassTag[C]):org.mongodb.scala.FindObservable[C]>` method
         in the
         `MongoDB Scala Driver <http://mongodb.github.io/mongo-scala-driver/>`_.
         The examples on this page use the ``inventory`` collection. To
         populate the ``inventory`` collection, run the following:

     - id: csharp
       content: |
         This page provides examples of |query_operations| using the
         :csharp-api:`MongoCollection.Find() <M_MongoDB_Driver_MongoCollection_1_Find>`
         method in the
         `MongoDB C# Driver <https://mongodb.github.io/mongo-csharp-driver/>`_.
         The examples on this page use the ``inventory`` collection. To
         populate the ``inventory`` collection, run the following:

     - id: go
       content: |
       
          This page provides examples of |query_operations| using the
          :go-api:`Collection.Find <mongo#Collection.Find>`
          function in the
          `MongoDB Go Driver <https://github.com/mongodb/mongo-go-driver/>`_.
          The examples on this page use the ``inventory`` collection. To
          populate the ``inventory`` collection, run the following:
