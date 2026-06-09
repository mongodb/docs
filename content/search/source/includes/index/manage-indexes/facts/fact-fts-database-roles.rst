The following table shows the :ref:`Database Built-in User Roles <mongodb-users-roles-and-privileges>`
that support the specified :manual:`{+fts+} Index Privilege Actions </reference/privilege-actions/#atlas-search-index-actions>`. 

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 30 30 40

   * - Database Built-in User Roles
     - {+fts+} Action Description 
     - {+fts+} Index Privilege Action

   * - :atlasrole:`read` or :atlasrole:`readAnyDatabase`
     - To view {+fts+} indexes and analyzers.
     - :manual:`listSearchIndexes </reference/privilege-actions/#mongodb-authaction-listSearchIndexes>`
   * - :atlasrole:`readWrite` or :atlasrole:`readWriteAnyDatabase`
     - To create, view, update, and delete {+fts+} indexes and analyzers.
     - :manual:`createSearchIndexes </reference/privilege-actions/#mongodb-authaction-createSearchIndexes>`,
       :manual:`listSearchIndexes </reference/privilege-actions/#mongodb-authaction-listSearchIndexes>`
       :manual:`updateSearchIndex </reference/privilege-actions/#mongodb-authaction-updateSearchIndex>`, 
       and 
       :manual:`dropSearchIndex </reference/privilege-actions/#mongodb-authaction-dropSearchIndex>`

To learn more, see :ref:`atlas-user-privileges` or :ref:`atlas-specific-privileges`.