.. tabs::

   .. tab:: List View
      :tabid: list-view

      To modify a document, hover over the document and click the pencil
      icon:

      .. figure:: /images/atlas-ui/compass/edit-doc.png
         :figwidth: 696px
         :alt: Document Edit Selection

      After you click the pencil icon, the document enters edit mode.
      You can now make changes to the fields, values, or data types
      of values.

      Delete Fields
      ~~~~~~~~~~~~~

      To delete a field from a document, click the :icon-fa5:`trash-alt` icon to 
      the left of the field:

      .. figure:: /images/atlas-ui/compass/edit-doc3.png
         :figwidth: 740px
         :alt: Document Deletion

      Once selected, the field is marked for removal and appears
      highlighted in red. |service| asks for confirmation that you want to 
      update the document by removing the field.

      Add New Fields
      ~~~~~~~~~~~~~~

      To add a new field in the document after an existing field, hover
      over the row number in the dialog and click on the plus sign. The
      row number is not part of the document but is part of the dialog
      display.
      
      .. figure:: /images/atlas-ui/compass/add-field.png
         :figwidth: 740px
         :alt: Add a field to a document

      You can also add a new field at the end of the document by
      pressing the tab key when your text cursor is in the value of the
      last document field.

      Modify an Existing Field
      ~~~~~~~~~~~~~~~~~~~~~~~~

      To modify documents, click on existing field names or
      values and make changes. In this example, the ``borough`` was
      changed from ``Manhattan`` to ``Queens``. Changed fields appear highlighted in
      yellow:

      .. figure:: /images/atlas-ui/compass/update-field.png
         :figwidth: 740px
         :alt: Document Update View

      .. include:: /atlas-ui/includes/shared/fact-modify-findOneAndUpdate.rst

      .. include:: /atlas-ui/includes/shared/fact-modify-prevent-overwrites.rst

      Save Changes
      ~~~~~~~~~~~~

      When you are finished editing the document, click the ``Update``
      button to commit your changes.

      Revert a Change
      ~~~~~~~~~~~~~~~

      To revert changes to a document, hover over the edited field
      and click the :guilabel:`revert icon` which appears to the left
      of the field's line number.

      .. figure:: /images/atlas-ui/compass/revert-doc-list-view.png
         :alt: Revert Document in List View

   .. tab:: JSON View
      :tabid: json

      To modify a document, hover over the document and click the pencil
      icon:

      .. figure:: /images/atlas-ui/compass/document-edit-json.png
         :figwidth: 696px
         :alt: Document Edit Selection in JSON View

      After you click the pencil icon, the document enters edit mode.
      You can now add, remove, and edit field values by modifying
      the JSON document.

      By default, this view hides embedded objects and arrays. To expand
      embedded objects and array elements, hover over the target
      document and click the top arrow on the left side of the document.

      To expand individual objects and arrays, click the arrow to
      the left of the desired field.
      
      .. figure:: /images/atlas-ui/compass/expand-doc-json-view.png
         :figwidth: 696px
         :alt: Expand embedded objects in JSON view

      .. include:: /atlas-ui/includes/shared/fact-modify-findOneAndReplace.rst

      .. include:: /atlas-ui/includes/shared/fact-modify-prevent-overwrites.rst

   .. tab:: Table View
      :tabid: table-view

      To modify a document, hover over the document and click the pencil
      icon:

      .. figure:: /images/atlas-ui/compass/table-view-modify.png
         :figwidth: 696px
         :alt: Document Edit Selection in Table View

      After you click the pencil icon, the document enters edit mode.

      .. include:: /atlas-ui/includes/shared/fact-modify-findOneAndUpdate.rst
      
      .. include:: /atlas-ui/includes/shared/fact-modify-prevent-overwrites.rst

      Delete Fields
      ~~~~~~~~~~~~~

      To delete a field from a document:

      1. Click the value of the field you want to delete.

      #. Click the :icon-fa5:`trash-alt` icon.

      #. Click :guilabel:`Update` to confirm your changes.

      Add New Fields
      ~~~~~~~~~~~~~~

      To add a new field to the document:

      1. Click the field after which you wish to add the new field.

      #. Click the :icon-fa4:`plus-square` icon.

      #. Click :guilabel:`Add Field after <Field Name>`.

      #. Populate your newly created field.

      #. Click :guilabel:`Update` to confirm your changes.

      Revert a Change
      ~~~~~~~~~~~~~~~

      While modifying a document, you have the option to revert changes
      made to a field prior to saving the modified document.

      Click the :guilabel:`revert icon` which appears on the 
      right side of the edited table element.

      .. figure:: /images/atlas-ui/compass/revert-doc-table-view.png
         :alt: Document Revert Changes in Table View
