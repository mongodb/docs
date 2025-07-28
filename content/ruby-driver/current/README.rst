=================================
MongoDB Ruby Driver Documentation
=================================

This repository contains documentation regarding MongoDB Ruby Driver.

Build Locally
-------------

To build the documentation locally, 

- Install `giza <https://pypi.python.org/pypi/giza/>`_, if not already
  installed. There is an `installation guide 
  <https://docs.mongodb.com/meta/tutorials/install/>`_ on the MongoDB meta site
  to help you get started.

- Run the following to download and build this documentation locally::

     git clone git@github.com:mongodb/docs-ruby
     cd docs-ruby/
     make html

The generated HTML will be placed in ``build/master/html/``.

*Note*: The build process invokes Sphinx and expects Sphinx's various
binaries to be in PATH.

Changing Active Versions
------------------------

This is done in mongodb/docs-tools repo, see
https://github.com/mongodb/docs-tools/commit/6765172dbe5cb60fafd511be000dd99d653ab038
and https://github.com/mongodb/docs-tools/commit/240dac304afbdcfc5c698ebb6a7d260bd14cd48b.

Contribute
----------

To contribute to the documentation, 

- If you have not done so already, please sign the `MongoDB Contributor
  Agreement <https://www.mongodb.com/legal/contributor-agreement>`_.

- Fork this repository on GitHub and issue a pull request.

See the following documents that provide an overview of the
documentation style and process:

- `Style Guide <http://docs.mongodb.org/manual/meta/style-guide>`_
- `Documentation Practices <http://docs.mongodb.org/manual/meta/practices>`_
- `Documentation Organization <http://docs.mongodb.org/manual/meta/organization>`_
- `Build Instructions <http://docs.mongodb.org/manual/meta/build>`_

File JIRA Tickets
-----------------

File issue reports or requests at the `Documentation Jira Project
<https://jira.mongodb.org/browse/DOCS>`_.

Ruby Driver Branch List
-----------------------

The branch list as well as which is the current one is maintained here: https://github.com/mongodb/docs-tools/blob/master/data/ruby-driver-published-branches.yaml




Licenses
--------

All documentation is available under the terms of a `Creative Commons
License <http://creativecommons.org/licenses/by-nc-sa/3.0/>`_.

The MongoDB Documentation Project is governed by the terms of the
`MongoDB Contributor Agreement
<https://www.mongodb.com/legal/contributor-agreement>`_.

-- The MongoDB Docs Team
