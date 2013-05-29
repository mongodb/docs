+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| SQL                            | :program:`manual:mongo` Shell                       | C++ Driver                                            |
+================================+=====================================================+=======================================================+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    INSERT INTO USERS           |    db.users.insert( { a: 1, b: 1 } )                |    // GENOID is optional. if not done by client,      |
|    VALUES( 1, 1)               |                                                     |    // server will add an _id                          |
|                                |                                                     |                                                       |
|                                |                                                     |    c.insert("mydb.users",                             |
|                                |                                                     |      BSON(GENOID<<"a"<<1<<"b"<<1));                   |
|                                |                                                     |    // then:                                           |
|                                |                                                     |    string err = c.getLastError();                     |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT a,b FROM users       |    db.users.find( {},                               |    auto_ptr<DBClientCursor> cursor =                  |
|                                |                   {a: 1, b: 1 }                     |      c.query("mydb.users", Query(),                   |
|                                |                 )                                   |      0, 0, BSON("a"<<1<<"b"<<1));                     |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT * FROM users         |    db.users.find()                                  |    auto_ptr<DBClientCursor> cursor =                  |
|                                |                                                     |      c.query("mydb.users", Query());                  |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT *                    |    db.users.find( { age: 33 } )                     |    auto_ptr<DBClientCursor> cursor =                  |
|    FROM users                  |                                                     |      c.query("mydb.users", QUERY("age"<<33))          |
|    WHERE age=33                |                                                     |    // or:                                             |
|                                |                                                     |    auto_ptr<DBClientCursor> cursor =                  |
|                                |                                                     |      c.query("mydb.users", BSON("age"<<33))           |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT *                    |    db.users.find( { age: 33 } ).sort( { name: 1 } ) |    auto_ptr<DBClientCursor> cursor =                  |
|    FROM users                  |                                                     |      c.query("mydb.users",                            |
|    WHERE age=33                |                                                     |        QUERY("age"<<33).sort("name"));                |
|    ORDER BY name               |                                                     |                                                       |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT *                    |    db.users.find( { 'age': { $gt:33, $lte:40 } } )  |    auto_ptr<DBClientCursor> cursor =                  |
|    FROM users                  |                                                     |      c.query("mydb.users",                            |
|    WHERE age>33                |                                                     |      QUERY("age"<<GT<<33<<LTE<<40));                  |
|    AND age<=40                 |                                                     |                                                       |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    CREATE INDEX myindexname    |    db.users.ensureIndex( {name: 1 } )               |    c.ensureIndex("mydb.users", BSON("name"<<1));      |
|    ON users(name)              |                                                     |                                                       |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT *                    |    db.users.find().limit(10).skip(20)               |    auto_ptr<DBClientCursor> cursor =                  |
|    FROM users                  |                                                     |      c.query("mydb.users", Query(),                   |
|    LIMIT 10                    |                                                     |              10, 20);                                 |
|    SKIP 20                     |                                                     |                                                       |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT * FROM users LIMIT 1 |    db.users.findOne()                               |   bo obj = c.findOne("mydb.users", Query());          |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT DISTINCT last_name   |    db.users.distinct( 'last_name', {x: 1} )         |    // no helper for distinct yet in c++ driver,       |
|    FROM users                  |                                                     |    // so send command manually                        |
|    WHERE x=1                   |                                                     |    bo cmdResult;                                      |
|                                |                                                     |    bool ok = c.runCommand(                            |
|                                |                                                     |      "mydb",                                          |
|                                |                                                     |      BSON("distinct" << "users"                       |
|                                |                                                     |                      << "key" << "last_name"          |
|                                |                                                     |                      << "query" << BSON("x"<<1)),     |
|                                |                                                     |      cmdResult);                                      |
|                                |                                                     |    list<bo> results;                                  |
|                                |                                                     |    cmdResult["values"].Obj().Vals(results);           |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    SELECT COUNT(*)             |    db.users.find( { age: { $gt: 30 } } ).count()    |    unsigned long long n =                             |
|    FROM users                  |                                                     |       c.count("mydb.users", BSON("age"<<GT<<30));     |
|    where AGE > 30              |                                                     |                                                       |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    UPDATE users                |    db.users.update( { b: 'q' },                     |    c.update("mydb.users", QUERY("b"<<"q"),            |
|    SET a=a+2                   |                     { $inc: { a:2 } },              |             BSON("$inc"<<BSON("a"<<2)), false, true); |
|    WHERE b='q'                 |                     false, true)                    |    // then optionally:                                |
|                                |                                                     |    string err = c.getLastError();                     |
|                                |                                                     |    bool ok = err.empty();                             |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
| .. code-block:: sql            | .. code-block:: javascript                          | .. code-block:: cpp                                   |
|                                |                                                     |                                                       |
|    DELETE                      |    db.users.remove( { z: 'abc' } )                  |    c.remove("mydb.users", QUERY("z"<<"abc"));         |
|    FROM users                  |                                                     |    // then optionally:                                |
|    WHERE z="abc"               |                                                     |    string err = c.getLastError();                     |
|                                |                                                     |                                                       |
+--------------------------------+-----------------------------------------------------+-------------------------------------------------------+
