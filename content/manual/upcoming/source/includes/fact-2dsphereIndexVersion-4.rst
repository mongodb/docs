Starting in MongoDB 8.3, :ref:`2dsphereIndexVersion <2dsphere-index-versions>`
is set to version ``4`` by default. 

If you need to downgrade the :ref:`FCV <view-fcv>` to anything below 8.3, you
must first drop the ``2dsphere`` version ``4`` indexes.