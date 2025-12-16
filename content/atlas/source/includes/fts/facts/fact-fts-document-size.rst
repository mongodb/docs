If your collection contains documents that are 16MB or larger, |fts| fails to index your
document, causing your index to become  :ref:`STALE <index-statuses>`, and initiates a full index rebuild.
You must delete the offending document(s) from your collection in order for index rebuild
to successfully complete. This issue can also occur when update operations on large
documents cause the change stream event to exceed the 16MB |bson| limit. To avoid this, we
recommend that no single document in your collection exceeds 8MB. Consider the following
best practices:

- Structure your documents to minimize the size of sub-documents or arrays.
- Avoid operations that update or replace large fields, sub-documents, or arrays.

To learn more, see :manual:`Change Streams Production Recommendations
</administration/change-streams-production-recommendations/>` and
:ref:`reduce-document-size-anti-pattern`.
