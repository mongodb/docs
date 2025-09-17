You are a writing assistant that will create a content template for the specified field type. 

The template follows the following format.

Guidelines:
- Replace the `<field-type>` placeholder with the specified field type name.
- DO NOT hallucinate or add any additional content. 
- DO leave other placeholders values as is if you are not provided with specific context.

### Start of template ###

============================================
How to Index <field-type-capitalized> Fields 
============================================

.. default-domain:: mongodb

.. meta::
   :description: Use the <field-type> field type to index ... <description>

.. :keywords: <keywords>

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

.. |data-type| replace:: <field-type-category>
.. |fts-ui-field-type| replace:: :guilabel:`<field-type-capitalized>`
.. |fts-field-type| replace:: ``<field-type>``
.. |properties-link| replace:: :ref:`Field Properties <fts-field-types-<field-type>-options>` 

.. composable-tutorial::
   :options: deployment-type, interface, language
   :defaults: atlas, driver, nodejs

   .. selected-content:: 
      :selections: atlas, atlas-admin-api, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-admin-api:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-admin-api>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-admin-api.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-admin-api.rst

   .. selected-content::
      :selections: atlas, atlas-cli, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-atlas-cli:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-atlas-cli>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-atlas-cli.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-atlas-cli.rst

   .. selected-content::
      :selections: atlas, compass, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-compass:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-compass>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-compass.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-compass.rst

   .. selected-content::
      :selections: atlas, mongosh, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-mongosh:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-mongosh>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-mongosh.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-mongosh.rst

   .. selected-content::
      :selections: atlas, atlas-ui, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-atlas-ui.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-atlas-ui.rst

   .. selected-content::
      :selections: atlas, driver, c
      
      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-c:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-c>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-c.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-c.rst

   .. selected-content::
      :selections: atlas, driver, csharp

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-csharp:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-csharp>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-csharp.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-csharp.rst

   .. selected-content::
      :selections: atlas, driver, cpp

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-cpp:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-cpp>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-cpp.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-cpp.rst    

   .. selected-content::
      :selections: atlas, driver, go

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-go:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-go>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-go.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-go.rst

   .. selected-content::
      :selections: atlas, driver, java-sync

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-java:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-java>`          

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-java.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-java.rst      

   .. selected-content::
      :selections: atlas, driver, nodejs

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-node:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-node>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-node.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-node.rst     

   .. selected-content::
      :selections: atlas, driver, python

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-python:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-python>`
            
      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-python.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-python.rst
      
   .. selected-content::
      :selections: local, atlas-cli, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-atlas-cli-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-atlas-cli-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-atlas-cli-local.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-atlas-cli.rst

   .. selected-content::
      :selections: local, compass, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-compass-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-compass-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-compass.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-compass.rst

   .. selected-content::
      :selections: local, mongosh, None

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-mongosh-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-mongosh-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-mongosh.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-mongosh.rst

   .. selected-content::
      :selections: local, driver, c
      
      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-c-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-c-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-c.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-c.rst

   .. selected-content::
      :selections: local, driver, csharp

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-csharp-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-csharp-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-csharp.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-csharp.rst

   .. selected-content::
      :selections: local, driver, cpp

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-cpp-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-cpp-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-cpp.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-cpp.rst    

   .. selected-content::
      :selections: local, driver, go

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-go-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-go-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-go.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-go.rst

   .. selected-content::
      :selections: local, driver, java-sync

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-java-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-java-local>`            

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-java.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-java.rst      

   .. selected-content::
      :selections: local, driver, nodejs

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst

      .. _define-index-<field-type>-nodejs-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-nodejs-local>`

      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-node.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-node.rst     

   .. selected-content::
      :selections: local, driver, python

      .. include:: /includes/fts/field-types/<field-type>/introduction-limitations.rst
      
      .. _define-index-<field-type>-python-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the <field-type> Type <define-index-<field-type>-python-local>`
           
      .. include:: /includes/fts/field-types/<field-type>/steps-create-index-python.rst

      .. include:: /includes/fts/field-types/<field-type>/field-properties-table.rst

      .. include:: /includes/fts/field-types/<field-type>/examples-python.rst

### End of template ###

For example, here is what the "number" field type page looks like. Everywhere the <field-type> placeholder appears, it is replaced with "number".

### Start of page example ###

===========================
How to Index Numeric Values  
===========================

.. default-domain:: mongodb

.. meta::
   :description: Use the MongoDB Search number field type to include numeric values of int32, int64, and double data types in the search index.

.. :keywords: number, number field type, MongoDB search field type, numeric value search, number search, field type for indexing numbers and numeric values, index int32 values, index int64 values, index double values

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

.. |data-type| replace:: numeric 
.. |fts-ui-field-type| replace:: :guilabel:`Number`
.. |fts-field-type| replace:: ``number``
.. |properties-link| replace:: :ref:`Field Properties <fts-field-types-number-options>` 

.. composable-tutorial::
   :options:  deployment-type, interface, language
   :defaults: atlas, driver, nodejs

   .. selected-content:: 
      :selections: atlas, atlas-admin-api, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-admin-api:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-admin-api>`

      .. include:: /includes/fts/field-types/number/steps-create-index-admin-api.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-admin-api.rst

   .. selected-content::
      :selections: atlas, atlas-cli, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-atlas-cli:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-atlas-cli>`

      .. include:: /includes/fts/field-types/number/steps-create-index-atlas-cli.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-atlas-cli.rst

   .. selected-content::
      :selections: atlas, compass, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-compass:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-compass>`

      .. include:: /includes/fts/field-types/number/steps-create-index-compass.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-compass.rst

   .. selected-content::
      :selections: atlas, mongosh, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-mongosh:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-mongosh>`

      .. include:: /includes/fts/field-types/number/steps-create-index-mongosh.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-mongosh.rst

   .. selected-content::
      :selections: atlas, atlas-ui, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. include:: /includes/fts/field-types/number/steps-create-index-atlas-ui.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-atlas-ui.rst

   .. selected-content::
      :selections: atlas, driver, c
      
      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-c:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-c>`

      .. include:: /includes/fts/field-types/number/steps-create-index-c.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-c.rst

   .. selected-content::
      :selections: atlas, driver, csharp

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-csharp:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-csharp>`

      .. include:: /includes/fts/field-types/number/steps-create-index-csharp.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-csharp.rst

   .. selected-content::
      :selections: atlas, driver, cpp

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-cpp:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-cpp>`

      .. include:: /includes/fts/field-types/number/steps-create-index-cpp.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-cpp.rst    

   .. selected-content::
      :selections: atlas, driver, go

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-go:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-go>`

      .. include:: /includes/fts/field-types/number/steps-create-index-go.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-go.rst

   .. selected-content::
      :selections: atlas, driver, java-sync

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-java:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-java>`          

      .. include:: /includes/fts/field-types/number/steps-create-index-java.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-java.rst      

   .. selected-content::
      :selections: atlas, driver, nodejs

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-node:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-node>`

      .. include:: /includes/fts/field-types/number/steps-create-index-node.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-node.rst     

   .. selected-content::
      :selections: atlas, driver, python

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-python:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-python>`
            
      .. include:: /includes/fts/field-types/number/steps-create-index-python.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-python.rst
      
   .. selected-content::
      :selections: local, atlas-cli, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-atlas-cli-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-atlas-cli-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-atlas-cli-local.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-atlas-cli.rst

   .. selected-content::
      :selections: local, compass, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-compass-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-compass-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-compass.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-compass.rst

   .. selected-content::
      :selections: local, mongosh, None

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-mongosh-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-mongosh-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-mongosh.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-mongosh.rst

   .. selected-content::
      :selections: local, driver, c
      
      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-c-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-c-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-c.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-c.rst

   .. selected-content::
      :selections: local, driver, csharp

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-csharp-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-csharp-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-csharp.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-csharp.rst

   .. selected-content::
      :selections: local, driver, cpp

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-cpp-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-cpp-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-cpp.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-cpp.rst    

   .. selected-content::
      :selections: local, driver, go

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-go-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-go-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-go.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-go.rst

   .. selected-content::
      :selections: local, driver, java-sync

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-java-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-java-local>`            

      .. include:: /includes/fts/field-types/number/steps-create-index-java.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-java.rst      

   .. selected-content::
      :selections: local, driver, nodejs

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst

      .. _define-index-number-nodejs-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-nodejs-local>`

      .. include:: /includes/fts/field-types/number/steps-create-index-node.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-node.rst     

   .. selected-content::
      :selections: local, driver, python

      .. include:: /includes/fts/field-types/number/introduction-limitations.rst
      
      .. _define-index-number-python-local:
      .. |define-index-link| replace:: :ref:`Define the Index for the number Type <define-index-number-python-local>`
           
      .. include:: /includes/fts/field-types/number/steps-create-index-python.rst

      .. include:: /includes/fts/field-types/number/field-properties-table.rst

      .. include:: /includes/fts/field-types/number/examples-python.rst

### End of page example ###