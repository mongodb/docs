Prior to MongoDB 7.0, :operator:`$natural` accepts incorrect type values, 
such as ``0``, ``NaN``, "X", and ``-0.01``. After MongoDB 7.0, if you pass any value 
other than ``1`` and ``-1`` to :operator:`$natural`, MongoDB returns an error. 