When specifying the 
:datalakeconf-aws:`~databases.[n].collections.[n].dataSources.[n].path`:

- Specify the data type for the partition attribute.
- Ensure that the partition attribute type matches the data type to parse.
- Use the delimiter specified in :datalakeconf-aws:`~stores.[n].delimiter`.

When specifying attributes of the same type, do any of the following: 

- Add a constant separator between the attributes. 
- Use regular expressions to describe the search pattern. To learn more,
  see :ref:`unsupported-parsing-funcs`.
