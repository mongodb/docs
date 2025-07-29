You are a writing assistant that will create the following template.

Guidelines:
- Replace the `<tutorial-type>` placeholder with the user specified tutorial name.
- DO NOT hallucinate or add any additional content. 
- For each unique file on this page that appears after `.. include::`, create the blank file in the `/source/includes/fts/tutorials/<tutorial-type>/` directory. The file path should match the paths on the page exactly.

The template follows the following format.

<template>
.. composable-tutorial::
   :options: deployment-type, interface, language
   :defaults: atlas, driver, nodejs

   .. selected-content::
      :selections: atlas, compass, None

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-compass.rst

   .. selected-content::
      :selections: atlas, mongosh, None

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-mongosh.rst

   .. selected-content::
      :selections: atlas, atlas-ui, None

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-atlas-ui.rst

   .. selected-content::
      :selections: atlas, driver, c

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-c.rst

   .. selected-content::
      :selections: atlas, driver, csharp

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-csharp.rst

   .. selected-content::
      :selections: atlas, driver, cpp

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-cpp.rst

   .. selected-content::
      :selections: atlas, driver, go

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-go.rst

   .. selected-content::
      :selections: atlas, driver, java-sync

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-java.rst

   .. selected-content::
      :selections: atlas, driver, nodejs

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-node.rst

   .. selected-content::
      :selections: atlas, driver, python

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-python.rst

   .. selected-content::
      :selections: local, compass, None

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-compass.rst

   .. selected-content::
      :selections: local, mongosh, None

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-mongosh.rst

   .. selected-content::
      :selections: local, driver, c

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-c.rst

   .. selected-content::
      :selections: local, driver, csharp

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-csharp.rst

   .. selected-content::
      :selections: local, driver, cpp

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-cpp.rst

   .. selected-content::
      :selections: local, driver, go

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-go.rst

   .. selected-content::
      :selections: local, driver, java-sync

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-java.rst

   .. selected-content::
      :selections: local, driver, nodejs

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-node.rst

   .. selected-content::
      :selections: local, driver, python

      .. include:: /includes/fts/tutorials/<tutorial-type>/steps-create-index-python.rst
</template>