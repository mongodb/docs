MongoDB provides a :ref:`"snippet" <snip-overview>`, an 
extension to :binary:`~bin.mongosh`, that decodes hex-encoded
resume tokens.

You can install and run the `resumetoken
<https://github.com/mongodb-labs/mongosh-snippets/tree/main/snippets/resumetoken>`__
snippet from :binary:`~bin.mongosh`:

.. code-block:: javascript

   snippet install resumetoken
   decodeResumeToken('<RESUME TOKEN>')

You can also run `resumetoken
<https://github.com/mongodb-labs/mongosh-snippets/tree/main/snippets/resumetoken>`__
from the command line (without using :binary:`~bin.mongosh`) if ``npm``
is installed on your system:

.. code-block:: javascript

   npx mongodb-resumetoken-decoder <RESUME TOKEN>

See the following for more details on:

- `resumetoken
  <https://github.com/mongodb-labs/mongosh-snippets/tree/main/snippets/resumetoken>`__
- :ref:`using snippets <snip-using-snippets>` in :binary:`~bin.mongosh`.

