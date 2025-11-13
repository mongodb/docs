The :guilabel:`{+fts+}` page in the {+atlas-ui+} displays details about
all of the {+fts+} indexes on a cluster. 

This page contains a table with the following details for each of your 
{+fts+} indexes in each column:

.. include:: /includes/fts/list-tables/search-indexes.rst

By default, |service| sorts the indexes first by database name, then
collection name. To sort by multiple columns, press :kbd:`Shift` and
click the column names according to the sort priority you want.

From this table, you can open the following pages for more details
about each index: 

Index Overview 
~~~~~~~~~~~~~~

To open the :guilabel:`Index Overview` page from the table on the
:guilabel:`{+fts+}` page, click the :guilabel:`Index Name` of the index
that you want to view.

For each index, the :guilabel:`Index Overview` page shows the
:manual:`namespace </reference/limits/#std-label-faq-dev-namespace>` for
the index and the following configurations specified in the index
definition:

.. include:: /includes/fts/list-tables/index-overview.rst

To learn how to view index status details from the {+fts+} page, see
:ref:`fts-index-statuses`. 