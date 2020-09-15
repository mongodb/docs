.. list-table::
   :header-rows: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - ``id``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - Unique identifier for the organization.

   * - ``isDeleted``
     - boolean
     - Flag indicating if the organization is deleted.
       
   * - ``links``
     - document array
     - One or more links to sub-resources and/or related resources. The
       relations between URLs are explained in the `Web Linking Specification
       <https://tools.ietf.org/html/rfc5988>`_.

   * - ``name``
     - string
     - New name of the organization.