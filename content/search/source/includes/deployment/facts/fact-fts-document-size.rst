.. SHARED FILE: This file is a copy of
   content/search/source/includes/shared/facts/fact-fts-document-size.rst
   Any changes here must also be applied to the source file.

If your collection contains documents that are 16MB (|bson| limit),
|fts| fails to index the document, causes your index to become
:ref:`STALE <index-statuses>`, and requires a full index rebuild.
This issue can also occur when update operations on documents cause
the change stream event to exceed the 16MB |bson| limit. To minimize
the risk of your index becoming stale, ensure that
documents in your collection don't exceed 8MB. If your index has become
stale, you must delete the large document(s) from your collection
in order for the index rebuild to complete.

In addition:

- Structure your documents to minimize the size of sub-documents
  or arrays.
- Avoid operations that update or replace large fields,
  sub-documents, or arrays.

To learn more, see :manual:`Change Streams Production Recommendations
</administration/change-streams-production-recommendations/>` and
:opsmgr:`Reduce the Size of Large Documents
</schema-advisor/reduce-document-size/>`.
