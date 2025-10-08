The Ruby driver does not depend on ActiveSupport. However, if your
application uses ActiveSupport or Ruby on Rails, you must load the driver's
ActiveSupport compatibility code for behavior such as time serialization to be
correct:

.. code-block:: ruby

   require 'mongo'
   require 'mongo/active_support'

Applications using Mongoid 7.0.6 or newer do not need to explicitly load
the driver's ActiveSupport code, because Mongoid automatically does so.