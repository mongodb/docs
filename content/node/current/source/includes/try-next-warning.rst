.. warning::

   The `tryNext() <{+api+}/classes/ChangeStream.html#tryNext>`_ method does not
   automatically update the change stream's `resumeToken.
   <{+api+}/classes/ChangeStream.html#resumeToken>`_ If you require an updated
   ``resumeToken``, use the ``next()`` method.