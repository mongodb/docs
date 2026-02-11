:issue:`SERVER-118428`: Changes to ``mongocryptd`` limit the maximum size 
of messages that ``mongocryptd`` can receive to 16 KiB. Users may encounter 
this issue when they send commands larger than 16 KiB through automatic 
Client-Side Field Level Encryption (CSFLE) or Queryable Encryption.

| To avoid this bug, skip these versions when you upgrade ``mongocryptd`` or
  use the :ref:`crypt_shared library <qe-reference-shared-library>`.
