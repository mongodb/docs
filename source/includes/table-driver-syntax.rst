.. list-table::
   :header-rows: 1

   * - JavaScript

     - Python

     - PHP

     - Ruby

     - Java

     - C++

     - C#

     - Perl

   * - .. code-block:: javascript
       
          [ ]
       

     - .. code-block:: python
       
          []
       

     - .. code-block:: php
       
          array()
       

     - .. code-block:: ruby
       
          []
       

     - .. code-block:: java
       
          BasicDBList
       

     - .. code-block:: cpp
       
          BSONObj
       
       or
       
       .. code-block:: cpp
       
          bson::bo
       

     - .. code-block:: csharp
       
          BsonArray
       

     - .. code-block:: perl
       
          [ ]
       

   * - .. code-block:: javascript
       
          {}
       

     - .. code-block:: python
       
          {}
       

     - .. code-block:: php
       
          new stdClass
       

     - .. code-block:: ruby
       
          {}
       

     - .. code-block:: java
       
          BasicDBObject
       

     - .. code-block:: cpp
       
          BSONObj
       

     - .. code-block:: csharp
       
          BsonDocument
       

     - .. code-block:: perl
       
          {}
       

   * - .. code-block:: javascript
       
          { x : 1 }
       

     - .. code-block:: python
       
          {"x": 1}
       

     - .. code-block:: php
       
          array('x' => 1)
       

     - .. code-block:: ruby
       
          {'x' => 1}
       

     - .. code-block:: java
       
          BasicDBObjectBuilder.start().add("x", 1).get()
       

     - .. code-block:: cpp
       
          BSONObjBuilder().append("x", 1).obj();
          BSON( "x" << 1 )
       

     - .. code-block:: csharp
       
          new BsonDocument("x", 1)
       

     - .. code-block:: perl
       
          { x : 1 }
       

   * - .. code-block:: javascript
       
          connect("www.example.net")
       

     - .. code-block:: python
       
          MongoClient("www.example.net")
       

     - .. code-block:: php
       
          new MongoClient("mongodb://www.example.net")
       

     - .. code-block:: ruby
       
          MongoClient.new("www.example.net")
       

     - .. code-block:: java
       
          new MongoClient("www.example.net")
       

     - .. code-block:: cpp
       
          mongo::DBClientConnection conn;
          conn.connect("www.example.net");
       

     - .. code-block:: csharp
       
          MongoClient("mongodb://www.example.net");
       

     - .. code-block:: perl
       
          MongoDB::Client->new(host => 'www.example.net')
       

   * - .. code-block:: javascript
       
          cursor.next()
       

     - .. code-block:: python
       
          cursor.next()
       

     - .. code-block:: php
       
          $cursor->getNext()
       

     - .. code-block:: ruby
       
          cursor.next
       

     - .. code-block:: java
       
          cursor.next()
       

     - .. code-block:: cpp
       
          cursor.next()
       

     - .. code-block:: csharp
       
          foreach (var document in cursor)
       

     - .. code-block:: perl
       
          $cursor->next()
       

   * - .. code-block:: javascript
       
          cursor.hasNext()
       

     - Does not exist

     - .. code-block:: php
       
          $cursor->hasNext()
       

     - .. code-block:: ruby
       
          cursor.has_next?
       

     - .. code-block:: java
       
          cursor.hasNext()
       

     - .. code-block:: cpp
       
          cursor.more()
       

     -  

     - .. code-block:: perl
       
          $cursor->has_next()
       

   * - .. code-block:: javascript
       
          collection.findOne()
       

     - .. code-block:: python
       
          collection.find_one()
       

     - .. code-block:: php
       
          $collection->findOne()
       

     - .. code-block:: ruby
       
          collection.find_one
       

     - .. code-block:: java
       
          collection.findOne()
       

     - .. code-block:: cpp
       
          connection.findOne(namespace, query)
       

     - .. code-block:: csharp
       
          collection.FindOne()
       

     - .. code-block:: perl
       
          $collection->find_one()
       

