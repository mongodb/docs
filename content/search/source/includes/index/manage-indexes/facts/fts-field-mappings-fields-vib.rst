Required if :guilabel:`Dynamic Mapping` in the :guilabel:`Index
Configurations` section is disabled.

Specify the fields to index:

a. Click :guilabel:`Add Field Mapping` to open the :guilabel:`Add
   Field Mapping` window.

#. Specify the following information about the field:

   - :guilabel:`Field name` - Name of the field to index.
   - :guilabel:`Data Type` - Field data type. To learn
     more about the supported data types and their options, see
     :ref:`bson-data-chart`.

#. *(Optional)* Specify additional properties.

   A table of additional configuration options appears in the
   :guilabel:`Add Field Mapping` window. These properties depend on
   the data type that you selected in the last step.

   To learn more about the supported data types and their options,
   see :ref:`bson-data-chart`.

#. *(Optional)* Add multi field.

   Click :guilabel:`Add Multi Field` to configure an alternative
   field analyzer with which to index the field. To learn more, see
   :ref:`ref-multi-analyzers`.

#. Click :guilabel:`Add` to add the field.

   You can click the ellipses (:guilabel:`...`) icon for
   the field in the :guilabel:`Actions` column to do the following:

   - Click :guilabel:`Edit` to modify the configuration.
   - Click :guilabel:`Add Data Type` to configure additional data
     types for the field.
   - Click :guilabel:`Delete` to remove the field from the index.

To learn more about defining field mappings, see
:ref:`ref-index-definitions`.
