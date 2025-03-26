This code performs the following actions:

- Creates a list of sample documents that includes ``text`` and
  ``metadata`` fields.

- Converts the content of the ``text`` field to embeddings and persists
  the data to |service|. The code includes a delay to accommodate the time
  needed for the vector conversion.

Add the following code into your ``Main.java`` file:
