
Use the :method:`db.adminCommand` method to call the 
:dbcommand:`checkMetadataConsistency` command:

.. code-block:: javascript

  db.adminCommand( { checkMetadataConsistency: 1 } )
  
The method returns a cursor with a batch of documents showing the inconsistencies
found in the sharding metadata.  The example below shows a cursor with
a |incon-type| inconsistency document:
