By default, MongoDB stores the {+key-vault-long+} on the cluster that
hosts your data. MongoDB also supports hosting the {+key-vault-long+}
on a different MongoDB deployment. Applications must have access to
both clusters to perform {+qe+} operations.

To protect your {+dek-abbr-no-hover+}s, host your {+key-vault-long+}
on a separate MongoDB deployment. Apply tighter security to that
deployment than to the cluster that hosts your data. This additional
control helps prevent unapproved changes to your {+key-vault-long+}
documents, such as changes to the KMS endpoint configuration.
