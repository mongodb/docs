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
:func:`db.runCommand()` shell helper in the following form:

.. code-block:: javascript

   db.runCommand( { validate: "people", full: true } )
   db.people.validate(true)

.. seealso:: ":dbcommand:`validate`" and ":func:`validate()`."

Values
------

.. data:: ns

.. data:: firstExtent

.. data:: lastExtent

.. data:: extentCount

.. :data:: extents

   .. note::

      This sub-document is only returned when you specify the "``full``" option.

   .. :data:: extents.loc

   .. :data:: extents.xnext

   .. :data:: extents.xprev

   .. :data:: extents.nsdaig

   .. :data:: extents.size

   .. :data:: extents.firstRecord

   .. :data:: extents.lastRecord

.. data:: datasize

.. data:: nsrecords

.. data:: lastExtentSize

.. data:: padding

.. data:: firstExtentDetails

   .. data:: firstExtentDetails.loc

   .. data:: firstExtentDetails.xnext

   .. data:: firstExtentDetails.xprev

   .. data:: firstExtentDetails.nsdiag

   .. data:: firstExtentDetails.size

   .. data:: firstExtentDetails.firstRecord

   .. data:: firstExtentDetails.lastRecord

.. data:: objectsFound

.. data:: invalidObjects

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. data:: byteswWithHeaders

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. data:: bytesWithoutHeaders

   .. note::

      This field is only included in the validation output when you
      specify the "``full``" option.

.. data:: deletedCount

.. data:: deletedSize

.. data:: nIndexes

.. data:: keysPerIndex

.. data:: valid

.. data:: errors

.. data:: ok
