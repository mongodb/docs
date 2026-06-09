The following index example disables dynamic mappings at the root level
and uses static mappings to index the ``relationships`` field as the
``embeddedDocuments`` type. It also applies the configured
``stringBooleanIndex`` ``typeSet`` to index only the ``string`` and
``boolean`` types the ``relationships`` array of objects. It applies the
``stringBooleanIndex`` ``typeSet`` to the nested ``person`` document to
index only the ``boolean`` and ``string`` types in the ``person``
document.