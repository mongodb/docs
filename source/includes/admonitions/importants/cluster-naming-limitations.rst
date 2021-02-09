.. important::

   |service| truncates the cluster name to *23 characters* in
   its internal interactions. In practice, this means:

   - Cluster names shorter than 23 characters can't end with
     hyphen or dash (``-``)

   - Cluster names 23 characters or longer can't use a hyphen or
     dash (``-``) as its 23rd character.

   - The first 23 characters in a cluster name must be unique
     within a project.
