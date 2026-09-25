When you create your first |service| {+cluster+} using the
{+atlas-ui+}, you can either:

- Use a template with preset advanced configuration
  options.

- Specify advanced configuration options.

Whether you use a template or specify advanced configuration, you can
:ref:`modify an {+atlas-core-cluster+} <scale-cluster>` or :ref:`modify an
{+atlas-infinite-cluster+} <atlas-infinite-modify-cluster>` after you create
the {+cluster+}. To use a different edition, create a new {+cluster+} and
select the edition at creation time.

.. note::

   The procedure for creating a new |service| {+cluster+} in the
   {+atlas-ui+} differs depending on whether you already have one or
   more {+database-deployments+} in your project. The following steps
   apply to both, but you may see slightly different options in the UI.

.. selected-content::
   :selections: atlas-ui, template

   .. include:: /includes/steps-create-new-cluster-from-template.rst

.. selected-content::
   :selections: atlas-ui, advanced

   .. include:: /includes/steps-create-new-cluster-advanced.rst
