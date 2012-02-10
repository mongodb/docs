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
:mjs:func:`db.runCommand()` shell helper in the following form:

.. code-block:: javascript

   db.runCommand( { validate: "people", full: true } )
   db.people.validate(true)

.. seealso:: ":dbcommand:`validate`" and ":mjs:func:`validate()`."

Values
------

.. mjs:data:: ns

.. mjs:data:: firstExtent

.. mjs:data:: lastExtent

.. mjs:data:: extentCount

.. mjs::data:: extents

   .. note::

      This sub-document is only returned when you specify the "``full``" option.

   .. mjs::data:: extents.loc

   .. mjs::data:: extents.xnext

   .. mjs::data:: extents.xprev

   .. mjs::data:: extents.nsdaig

   .. mjs::data:: extents.size

   .. mjs::data:: extents.firstRecord

   .. mjs::data:: extents.lastRecord

.. mjs:data:: datasize

.. mjs:data:: nsrecords

.. mjs:data:: lastExtentSize

.. mjs:data:: padding

.. mjs:data:: firstExtentDetails

   .. mjs:data:: firstExtentDetails.loc

   .. mjs:data:: firstExtentDetails.xnext

   .. mjs:data:: firstExtentDetails.xprev

   .. mjs:data:: firstExtentDetails.nsdiag

   .. mjs:data:: firstExtentDetails.size

   .. mjs:data:: firstExtentDetails.firstRecord

   .. mjs:data:: firstExtentDetails.lastRecord

.. mjs:data:: objectsFound

.. mjs:data:: invalidObjects

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. mjs:data:: byteswWithHeaders

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. mjs:data:: bytesWithoutHeaders

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. mjs:data:: deletedCount

.. mjs:data:: deletedSize

.. mjs:data:: nIndexes

.. mjs:data:: keysPerIndex

.. mjs:data:: valid

.. mjs:data:: errors

.. mjs:data:: ok
