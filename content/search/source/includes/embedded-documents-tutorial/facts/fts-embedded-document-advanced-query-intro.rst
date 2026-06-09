This query demonstrates a compound query that searches fields inside the following arrays:

- Array of documents.
- Array of documents nested inside an array of documents.

It searches for schools that have a teacher teaching ``12th`` grade
``science`` class at the ``teachers.classes`` path, preferring schools
with teachers with last name ``Smith`` who teach that class. It also
enables :ref:`highlighting <highlight-ref>` on the ``subject`` field
inside the ``classes`` array of the documents which is nested inside the
``teachers`` array of documents.
