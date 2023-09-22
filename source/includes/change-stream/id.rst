.. _|idref|-id:

A :term:`BSON` object which serves as an identifier for the
change stream event. This value is used as the ``resumeToken``
for the ``resumeAfter`` parameter when resuming a change stream.
The ``_id`` object has the following form:

.. code-block:: none

   {
      "_data" : <BinData|hex string>
   }

The ``_data`` type depends on the MongoDB versions
and, in some cases, the :ref:`feature compatibility version (fCV)
<view-fcv>` at the time of the change stream's
opening or resumption. See :ref:`change-stream-resume-token` for the
full list of ``_data`` types.

For an example of resuming a change stream by ``resumeToken``, see 
:ref:`change-stream-resume`.

