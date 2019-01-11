.. list-table::
   :header-rows: 1

   * - SQL

     - :program:`manual:mongo` Shell

     - C++ Driver

   * - .. code-block:: sql
       
          INSERT INTO USERS
          VALUES( 1, 1)
       

     - .. code-block:: javascript
       
          db.users.insert( { a: 1, b: 1 } )
       

     - .. code-block:: cpp
       
          // GENOID is optional. if not done by client,
          // server will add an _id
       
          c.insert("mydb.users", 
            BSON(GENOID<<"a"<<1<<"b"<<1));
          // then:
          string err = c.getLastError();
       

   * - .. code-block:: sql
       
          SELECT a,b FROM users
       

     - .. code-block:: javascript
       
          db.users.find( {},
                         {a: 1, b: 1 }
                       )
       

     - .. code-block:: cpp
       
          BSONObj b = BSON("a"<<1<<"b"<<1)
          auto_ptr<DBClientCursor> cursor =
            c.query("mydb.users", Query(), 
            0, 0, &b);
       

   * - .. code-block:: sql
       
          SELECT * FROM users
       

     - .. code-block:: javascript
       
          db.users.find()
       

     - .. code-block:: cpp
       
          auto_ptr<DBClientCursor> cursor =
            c.query("mydb.users", Query());
       

   * - .. code-block:: sql
       
          SELECT *
          FROM users
          WHERE age=33
       

     - .. code-block:: javascript
       
          db.users.find( { age: 33 } )
       

     - .. code-block:: cpp
       
          auto_ptr<DBClientCursor> cursor =
            c.query("mydb.users", QUERY("age"<<33))
          // or:
          auto_ptr<DBClientCursor> cursor =
            c.query("mydb.users", BSON("age"<<33))
       

   * - .. code-block:: sql
       
          SELECT *
          FROM users
          WHERE age=33
          ORDER BY name
       

     - .. code-block:: javascript
       
          db.users.find( { age: 33 } ).sort( { name: 1 } )
       

     - .. code-block:: cpp
       
          auto_ptr<DBClientCursor> cursor =
            c.query("mydb.users", 
              QUERY("age"<<33).sort("name"));
       

   * - .. code-block:: sql
       
          SELECT *
          FROM users
          WHERE age>33
          AND age<=40
       

     - .. code-block:: javascript
       
          db.users.find( { 'age': { $gt:33, $lte:40 } } )
       

     - .. code-block:: cpp
       
          auto_ptr<DBClientCursor> cursor =
            c.query("mydb.users", 
            QUERY("age"<<GT<<33<<LTE<<40));
       

   * - .. code-block:: sql
       
          CREATE INDEX myindexname
          ON users(name)
       

     - .. code-block:: javascript
       
          db.users.ensureIndex( {name: 1 } )
       

     - .. code-block:: cpp
       
          c.ensureIndex("mydb.users", BSON("name"<<1));
       

   * - .. code-block:: sql
       
          SELECT *
          FROM users
          LIMIT 10
          SKIP 20
       

     - .. code-block:: javascript
       
          db.users.find().limit(10).skip(20)
       

     - .. code-block:: cpp
       
          auto_ptr<DBClientCursor> cursor =
            c.query("mydb.users", Query(), 
                    10, 20);
       

   * - .. code-block:: sql
       
          SELECT * FROM users LIMIT 1
       

     - .. code-block:: javascript
       
          db.users.findOne()
       

     - .. code-block:: cpp
       
         bo obj = c.findOne("mydb.users", Query());
       

   * - .. code-block:: sql
       
          SELECT DISTINCT last_name
          FROM users
          WHERE x=1
       

     - .. code-block:: javascript
       
          db.users.distinct( 'last_name', {x: 1} )
       

     - .. code-block:: cpp
       
          // no helper for distinct yet in c++ driver,
          // so send command manually
          bo cmdResult;
          bool ok = c.runCommand(
            "mydb",
            BSON("distinct" << "users"
                            << "key" << "last_name"
                            << "query" << BSON("x"<<1)),
            cmdResult);
          list<bo> results;
          cmdResult["values"].Obj().Vals(results);
       

   * - .. code-block:: sql
       
          SELECT COUNT(*) 
          FROM users
          where AGE > 30
       

     - .. code-block:: javascript
       
          db.users.find( { age: { $gt: 30 } } ).count()
       

     - .. code-block:: cpp
       
          unsigned long long n = 
             c.count("mydb.users", BSON("age"<<GT<<30));
       

   * - .. code-block:: sql
       
          UPDATE users 
          SET a=a+2 
          WHERE b='q'
       

     - .. code-block:: javascript
       
          db.users.update( { b: 'q' },
                           { $inc: { a:2 } }, 
                           false, true)
       

     - .. code-block:: cpp
       
          c.update("mydb.users", QUERY("b"<<"q"), 
                   BSON("$inc"<<BSON("a"<<2)), false, true);
          // then optionally:
          string err = c.getLastError();
          bool ok = err.empty();
       

   * - .. code-block:: sql
       
          DELETE
          FROM users
          WHERE z="abc"
       

     - .. code-block:: javascript
       
          db.users.remove( { z: 'abc' } )
       

     - .. code-block:: cpp
       
          c.remove("mydb.users", QUERY("z"<<"abc"));
          // then optionally:
          string err = c.getLastError();
       

