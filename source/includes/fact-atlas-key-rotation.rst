When you use your own cloud provider |kms|, |service| automatically
rotates the MongoDB master key (or :abbr:`DEK (data encryption key)`)
every 90 days. These keys are rotated on a rolling basis and the process
does not require the data to be rewritten.
