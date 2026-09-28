.. _|idref|-id:

A :term:`BSON` object, which serves as an identifier for the change
stream event. This value is used as the ``resumeToken`` for the
``resumeAfter`` parameter when resuming a change stream. The fields
within the ``_id`` object depend on the MongoDB versions and, in some
cases, the :ref:`feature compatibility version (FCV) <view-fcv>` at the
time of the change stream's opening or resumption.

For an example of resuming a change stream by ``resumeToken``, see 
:ref:`change-stream-resume`.
