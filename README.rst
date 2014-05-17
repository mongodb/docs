=====================
MongoDB Documentation
=====================

This repository contains a major revision of the MongoDB
documentation, currently accessible at <http://docs.mongodb.org/manual/>.
You can download and build locally if you already have `Sphinx
<http://sphinx.pocoo.org/>`_ and other dependencies installed, with
the following command::

     git clone https://github.com/mongodb/docs.git
     cd docs/
     python bootstrap.py
     make html

Visit ``docs/mongodb/build/html/index.html`` to view the current state
of the documentation. See `MongoDB Documentation Buildsystem
<http://docs.mongodb.org/manual/meta/build/>`_ for complete
instructions on building the MongoDB documentation.

To contribute to the documentation please fork this repository on
GitHub and issue a pull request. File issue reports or requests at the
`Documentation Jira Project <https://jira.mongodb.org/browse/DOCS>`_.
See the following documents within this repository that provide a more
thorough overview of the documentation style, process, and overall
organization:

- `Style Guide <http://docs.mongodb.org/manual/meta/style-guide>`_
- `Documentation Practices <http://docs.mongodb.org/manual/meta/practices>`_
- `Documentation Organization <http://docs.mongodb.org/manual/meta/organization>`_
- `Build Instructions <http://docs.mongodb.org/manual/meta/build>`_

All documentation is available under the terms of a `Creative Commons
License <http://creativecommons.org/licenses/by-nc-sa/3.0/>`_.

The MongoDB Documentation Project is governed by the terms of the
`MongoDB Contributor Agreement
<http://www.mongodb.com/legal/contributor-agreement>`_.

If you have any questions, please contact `docs@mongodb.com
<mailto:docs@mongodb.com>`_.

-- The MongoDB Documentation Team
