If your collection contains documents that are 16MB or larger, 
|fts| fails to index your data. This issue can also occur 
when update operations on large documents cause the change stream
event to exceed the 16MB |bson| limit. To avoid this, consider the 
following best practices:

- Structure your documents to minimize the size of sub-documents or arrays.
- Avoid operations that update or replace large fields, sub-documents, or arrays.

To learn more, see :manual:`Change Streams Production Recommendations 
</administration/change-streams-production-recommendations/>` and 
:ref:`reduce-document-size-anti-pattern`.
