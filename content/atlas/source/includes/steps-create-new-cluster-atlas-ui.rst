.. include:: /includes/admonitions/tips/tip-ai-cluster-assistant.rst

When you create your first |service| {+cluster+} using the
{+atlas-ui+}, you can either:

- Use a template with preset advanced configuration
  options.

- Specify advanced configuration options.

Whether you use a template or specify advanced configuration, you can
:ref:`modify all configuration options <scale-cluster>` after you create
the {+cluster+}.

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
