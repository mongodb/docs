.. warning::

   Do not attempt to create a time series collection or view with the
   name ``system.profile``. MongoDB 6.3 and later versions return an
   ``IllegalOperation`` error if you attempt to do so. **Earlier MongoDB
   versions crash.**
