.. warning::

   In {+driver-short+} v6.19 and earlier, the `tryNext() <{+api+}/classes/ChangeStream.html#tryNext>`_
   method does not automatically update the change stream's `resumeToken.
   <{+api+}/classes/ChangeStream.html#resumeToken>`_ If you require an updated
   ``resumeToken``, use the ``next()`` method or upgrade to driver v6.20 or later.