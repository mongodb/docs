.. list-table::
   :header-rows: 1

   * - **Shell Helpers**
     - **JavaScript Equivalents**

   * - ``show dbs``, ``show databases``

     - ``db.adminCommand('listDatabases')``

   * - ``use <db>``

     - ``db = db.getSiblingDB('<db>')``

   * - ``show collections``

     - ``db.getCollectionNames()``

   * - ``show users``

     - ``db.system.users.find()``

   * - ``show log <logname>``
   
     - ``db.adminCommand( { 'getLog' : '<logname>' } )``
     
   * - ``show logs``
   
     - ``db.adminCommand( { 'getLog' : '*' } )
