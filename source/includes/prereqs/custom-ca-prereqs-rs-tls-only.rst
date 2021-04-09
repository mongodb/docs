- Create a |pem| file for each of the following components:

  .. list-table::
     :header-rows: 1
     :widths: 30 70

     * - PEM file purpose
       - Save File As...
     * - Your custom |certauth|
       - ``ca-pem``
     * - Each member of your replica set
       - ``<metadata.name>-<X>-pem``

  .. include:: /includes/prereqs/pem-file-description.rst

  .. include:: /includes/prereqs/custom-ca-prereqs-naming-conventions.rst
  
  .. admonition:: About the Domain Names in certificates
  
     .. include:: /includes/prereqs/pem-file-domain-name.rst