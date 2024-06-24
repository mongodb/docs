An |fts| index is a data structure that categorizes data in an easily
searchable format. It is a mapping between terms and the documents that
contain those terms. |fts| indexes enable faster retrieval of documents
using certain identifiers. You must configure an |fts| index to query
data in your |service| cluster using |fts|. 

You can create an |fts| index on a single field or on multiple fields.
We recommend that you index the fields that you regularly use to sort
or filter your data in order to quickly retrieve the documents that
contain the relevant data at query-time.
