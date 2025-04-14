=====================
MongoDB Documentation
=====================

This repository contains a major revision of the MongoDB documentation,
currently accessible at http://docs.mongodb.com/manual/. You can build
the documentation locally if you have `giza
<https://pypi.python.org/pypi/giza>`_ installed: ::

     python2 -m pip install giza
     git clone https://github.com/mongodb/docs.git
     cd docs/
     make html

If successful, the built HTML files will be located in ``build/<branch>/html/`` (for example ``build/master/html/`` when on the git ``master`` branch).

Contribute
----------

The MongoDB Documentation Project is governed by the terms of the
`MongoDB Contributor Agreement
<https://www.mongodb.com/legal/contributor-agreement>`_.

To contribute to the documentation, 

- If you have not done so already, please sign the `MongoDB Contributor Agreement <https://www.mongodb.com/legal/contributor-agreement>`_.

- Fork this repository on GitHub and issue a pull request. 

Report Issues
-------------

To file issues or requests regarding the documentation, go to the
`Documentation Jira Project <https://jira.mongodb.org/browse/DOCS>`_.

License
-------

All documentation is available under the terms of a `Creative Commons
License <https://creativecommons.org/licenses/by-nc-sa/3.0/>`_.

If you have any questions, please contact `docs@mongodb.com
<mailto:docs@mongodb.com>`_.

-- The MongoDB Documentation Team
