.. important::

   |service| truncates the {+serverless-instance+} name to *23 characters* in
   its internal interactions. In practice, this means:

   - {+Serverless-instance+} names shorter than 23 characters can't end with
     hyphen or dash (``-``).

   - {+Serverless-instance+} names 23 characters or longer can't use a hyphen or
     dash (``-``) as its 23rd character.

   - The first 23 characters in a {+serverless-instance+} name must be unique
     within a project.
