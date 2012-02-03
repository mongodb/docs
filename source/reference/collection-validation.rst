================================
Collection Validation Statistics
================================

.. default-domain:: mongodb

Synopsis
--------

The collection validation command checks all of the structures within
a name space for correctness and returns a :term:`JSON Document`
containing information regarding the on-disk representation of the
collection

.. warning::

   Because :dbcommand:`validate` must scan all data in the collection,
   this command may consume a significant amount of systems resources
   and impede the performance of your database while the operation
   progresses.

Run the validation command in the :program:`mongo` shell using the
following form to validate a collection named "``people``":

.. code-block:: javascript

   db.people.validate()

Alternatively you can use the command prototype and the
:js:func:`db.runCommand()` shell helper in the following form:

.. code-block:: javascript

   db.runCommand( { validate: "people", full: true } )
   db.people.validate(true)

.. seealso:: ":dbcommand:`validate`" and ":js:func:`validate()`."

Values
------

.. js:data:: ns

.. js:data:: firstExtent

.. js:data:: lastExtent

.. js:data:: extentCount

.. js::data:: extents

   .. note::

      This sub-document is only returned when you specify the "``full``" option.

   .. js::data:: extents.loc

   .. js::data:: extents.xnext

   .. js::data:: extents.xprev

   .. js::data:: extents.nsdaig

   .. js::data:: extents.size

   .. js::data:: extents.firstRecord

   .. js::data:: extents.lastRecord

.. js:data:: datasize

.. js:data:: nsrecords

.. js:data:: lastExtentSize

.. js:data:: padding

.. js:data:: firstExtentDetails

   .. js:data:: firstExtentDetails.loc

   .. js:data:: firstExtentDetails.xnext

   .. js:data:: firstExtentDetails.xprev

   .. js:data:: firstExtentDetails.nsdiag

   .. js:data:: firstExtentDetails.size

   .. js:data:: firstExtentDetails.firstRecord

   .. js:data:: firstExtentDetails.lastRecord

.. js:data:: objectsFound

.. js:data:: invalidObjects

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. js:data:: byteswWithHeaders

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. js:data:: bytesWithoutHeaders

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. js:data:: deletedCount

.. js:data:: deletedSize

.. js:data:: nIndexes

.. js:data:: keysPerIndex

.. js:data:: valid

.. js:data:: errors

.. js:data:: ok
