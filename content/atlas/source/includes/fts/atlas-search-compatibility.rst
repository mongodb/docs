Atlas Compatibility
-------------------

For certain features, |fts| might require a specific version of 
MongoDB. The following table lists the |fts| features that require 
specific MongoDB versions.

.. list-table:: 
   :header-rows: 1
   :widths: 50 50

   * - |fts| Feature 
     - MongoDB Version for Feature 

   * - :ref:`Create indexes on Views 
       <fts-transform-documents-collections>`
     - 8.0+

   * - :ref:`Facets <fts-facet-ref>`
     - 7.0+, 8.0+

   * - :ref:`Facets on Sharded Clusters <fts-facet-ref>`
     - 7.0+, 8.0+

   * - :ref:`Stored Source Fields <fts-stored-source-definition>`
     - 7.0+, 8.0+

   * - :ref:`Query Analytics <fts-query-analytics>`
     - 7.0+, 8.0+

   * - :ref:`$lookup with $search <lookup-with-search-tutorial>`
     - 7.0+, 8.0+

   * - :ref:`$unionWith with $search <search-with-unionwith-tutorial>`
     - 7.0+, 8.0+

   * - :ref:`Sort <sort-ref>`
     - 7.0+, 8.0+

   * - :ref:`Sort on Sharded Clusters <sort-ref>`
     - 7.0+, 8.0+

   * - :ref:`Dedicated Search Nodes <configure-search-nodes>`
     - 7.0+, 8.0+

   * - :ref:`Manage search indexes programmatically with mongosh and
       MongoDB Drivers <fts-about-indexing>`
     - 7.0+, 8.0+

   * - :atlascli:`MongoDB Search local deployment </atlas-cli-deploy-local/#use-atlas-search-with-a-local-atlas-deployment>` with the {+atlas-cli+}
     - 7.0+, 8.0+

   * - :pipeline:`$search` ``searchAfter`` and ``searchBefore``
       :ref:`options <fts-paginate-results>` 
     - 6.0.13+, 7.0.5+, 8.0+

|fts| is not supported for :manual:`time series
</core/timeseries-collections/>` collections.

.. _atlas-fts-shared-tier-limitations:

Search M0 (Free Cluster) and {+Flex-Clusters+} Limitations
------------------------------------------------------------------

The following limitations apply to |fts| on ``M0`` and Flex
{+clusters+} only:

- .. include:: /includes/search-shared/fact-fts-shared-tier-limitations.rst
  
- When you reach the maximum number of indexes allowed for the {+cluster+} 
  tier, you can upgrade your {+cluster+} tier to create additional indexes. 
  If you upgrade your {+cluster+} tier, the indexes are rebuilt on the new 
  {+cluster+} tier, which triggers an 
  :ref:`initial sync <troubleshoot-initial-sync>`.

- An index definition JSON object cannot exceed 3KB in size.

- .. include:: /includes/fts/facts/fact-fts-synonym-mapping-limitation.rst
 
- Index builds with more than 300 fields fail.

- Lucene's default clause limit of 1024 applies to any ``BooleanQuery``
  created for searches.

- The :ref:`synonyms collection <synonyms-coll-spec>` can't exceed
  10,000 documents.

- |fts| doesn't capture or display :ref:`query analytics for tracked 
  queries <fts-tracking-ref>`. 

- |fts| doesn't support encrypting |fts| indexes with 
  :ref:`encryption keys using Customer Key Management 
  <security-kms-encryption>` in the {+atlas-ui+}.

.. note:: 

   You can request new functionality or upvote an existing request using
   the :ftsuservoice:`MongoDB Feedback Engine </>`.

Search Playground Limitations
-----------------------------

To learn about Search Playground limitations, see 
:ref:`fts-playground-limitations`.
