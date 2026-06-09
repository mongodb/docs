Configure |fts-field-type| Field Properties 
-------------------------------------------

The |fts| |fts-field-type| type takes the following parameters:

.. list-table::
   :widths: 20 10 10 40 20
   :header-rows: 1

   * - Option
     - Type
     - Necessity
     - Description
     - Default

   * - ``type``
     - string
     - Required
     - Human-readable label that identifies this field type.
       Value must be ``token``.
     - 

   * - ``normalizer``
     - string
     - Optional
     - Type of transformation to perform on the field value. Value can
       be one of the following:  
       
       - ``lowercase`` - to transform text values in string fields to
         lowercase. 
       - ``none`` - to not perform any transformation.

       If you don't set this option explicitly, it defaults to ``none``. 

     - ``none``