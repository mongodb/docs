===============================
MongoDB Ecosystem Documentation
===============================

This repository contains documentation regarding components of the
MongoDB ecosystem that lay outside of the core server
functionality. This documentation builds on the work of the `MongoDB
Manual <http://docs.mongodb.org/manual/>`. You can download and build
this documentation locally if you already have `Sphinx
<http://sphinx.pocoo.org/>`_ installed, with the following command: ::

     git clone git://github.com/mongodb/docs-ecosystem
     cd docs-ecosystem/
     make html

To build on Windows (using Cygwin):

- Ensure you have python installed
- install Sphinx using ``easy_install -U Sphinx``
- install pyyamml using ``pip install pyyaml``
- Build the docs using ``sphinx-build  -b html -d build/doctrees-html -c ./ source build/html``

You may also wish to install `Pygments
<http://pygments.org>`_ to provide syntax highlighting for code
examples.

Contribute
----------

The MongoDB Documentation Project is governed by the terms of the
`MongoDB Contributor Agreement
<https://www.mongodb.com/legal/contributor-agreement>`_.

To contribute to the documentation, 

- If you have not done so already, please sign the `MongoDB Contributor Agreement <https://www.mongodb.com/legal/contributor-agreement>`_.

- Fork this repository on GitHub and issue a pull request. 

Additional Information
----------------------

See the following documents for an overview of the
documentation style, and process. These links point back to the MongoDB
Manual materials:

- `Style Guide <http://docs.mongodb.org/manual/meta/style-guide>`_
- `Documentation Practices <http://docs.mongodb.org/manual/meta/practices>`_
- `Documentation Organization <http://docs.mongodb.org/manual/meta/organization>`_
- `Build Instructions <http://docs.mongodb.org/manual/meta/build>`_

Report Issues
-------------

File issue reports or requests at the `Documentation Jira Project
<https://jira.mongodb.org/browse/DOCS>`_. 

License
-------

All documentation is available under the terms of a `Creative Commons
License <http://creativecommons.org/licenses/by-nc-sa/3.0/>`_.

If you have any questions, please contact `docs@10gen.com
<mailto:docs@10gen.com>`_.

-- The MongoDB/10gen Docs Team
