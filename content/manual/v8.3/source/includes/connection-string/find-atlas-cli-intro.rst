To find your {+atlas+} connection string using the :atlascli:`Atlas CLI
</>`, :atlascli:`install </install-atlas-cli/>` and :atlascli:`connect
</connect-atlas-cli/>` from the Atlas CLI, then run the following
command. Replace ``<clusterName>`` with the name of the {+atlas+}
cluster and replace ``<projectId>`` with the project ID.

.. code-block::

   atlas clusters connectionStrings describe <clusterName> --projectId
   <projectId>

To learn more, see :atlascli:`atlas clusters connectionStrings describe
</command/atlas-clusters-connectionStrings-describe/>`.
