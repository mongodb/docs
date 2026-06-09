
1. Click :guilabel:`Refine Your Index` to configure your index.
#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field` to open the :guilabel:`Add Field Mapping` window.
#. Click :guilabel:`Customized Configuration`.
#. Select the field to index from the :guilabel:`Field Name`
   dropdown.

   .. note::

      .. include:: /includes/shared/facts/fact-fts-field-name-restriction.rst

#. Click the :guilabel:`Data Type` dropdown and select
   |fts-ui-field-type|.
#. Toggle the :guilabel:`Enable Dynamic Mapping` setting to
   enable or disable dynamic indexing of all dynamically indexable
   fields in the document. To learn more, see
   :ref:`fts-field-types-document-options`.
#. Click :guilabel:`Add`.
#. If you disabled dynamic mapping, click |vib-field-name| for the
   |fts-ui-field-type| type field to define field mappings
   for the fields in the |data-type|.
