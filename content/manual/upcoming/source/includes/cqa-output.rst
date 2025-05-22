|CQA| returns a document containing fields that describe the old
configuration, if one exists, and fields describing the new 
configuration. 

- ``oldConfiguration``, if it exists, contains fields 
  describing the old configuration.
- ``newConfiguration`` contains fields describing the new
  configuration.

|CQA| returns a document similar to the following:

.. code-block:: none
   :copyable: false
   
   {
      ok: 1,
      oldConfiguration: {
        mode: ...,
        samplesPerSecond: ...
      }
      newConfiguration: {
        ...
      }
   }
