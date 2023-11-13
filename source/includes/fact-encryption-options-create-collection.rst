Starting in MongoDB 7.2, you can't specify ``wiredTiger`` storage
engine encryption options when you create a collection with 
:method:`db.createCollection()`. To configure encryption for 
the WiredTiger storage engine, see :ref:`security-encryption-at-rest`.