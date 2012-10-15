================================================
Building and Deploying the MongoDB Documentation
================================================

This document contains more direct instructions for building the
MongoDB documentation.

Requirements
------------

For basic publication and testing:

- GNU Make
- Python
- Git
- Sphinx (documentation management toolchain)
- Pygments (syntax highlighting)

For full publication builds:

- python-argparse 
- LaTeX/PDF LaTeX (typically texlive; for building PDFs)
- Common Utilities (rsync, tar, gzip, sed)

Building the Documentation
--------------------------

Clone the repository: ::

     git clone git://github.com/mongodb/docs.git

To build the full publication version of the manual, you will need to
have a function LaTeX tool chain; however, for routine day-to-day
rendering of the documentation you can install a much more minimal
tool chain. 

For Routine Builds
~~~~~~~~~~~~~~~~~~

Begin by installing dependencies. On Arch Linux, use the following
command to install the full dependencies: ::

     pacman -S python2-sphinx python2-pygments

On Debian/Ubuntu systems issue the following command: ::

     apt-get install python-sphinx

To build the documentation issue the following command: ::

     make html
     
You can find the build output in ``build/<branch>/html``, where
``<branch>`` is the name of your current branch.      

For Publication Builds
~~~~~~~~~~~~~~~~~~~~~~

Begin by installing additional dependencies. On Arch Linux, use the
following command to install the full dependencies: ::

     pacman -S texlive-bin texlive-core texlive-latexextra python2-sphinx python2-pygments

On Debian/Ubuntu systems use the following command: ::

     apt-get install python-argparse python-sphinx texlive-latex-recommended texlive-latex-recommended

**Note:** *The Debian/Ubuntu dependencies, have not been thoroughly
tested. If you find an additional dependency, please submit a pull
request to modify this document.*

On OS X:

#. You may need to use ``easy_install`` to install ``pip`` using the
   following command if you have not already done so: :: 
   
        easy_install pip
        
   Alternately, you may be able to replace ``pip`` with
   ``easy_install`` in the next step.

#. Install Sphinx, Docutils, and their dependencies with ``pip`` using
   the following command: :: 
   
        pip install Sphinx Jinja2 Pygments docutils

   ``Jinja2``, ``Pygments``, and ``docutils`` are all dependencies of
   ``Sphinx``.
   
   .. note:: 
      
      As of June 6, 2012 and Sphinx version 1.1.3, you **must**
      compile the MongoDB documentation using the Python 2.x series
      version of Sphinx. There are serious generation problems with
      the Python 3 series version of Sphinx.

#. Install a TeX distribution (for building the PDF.) If you do not
   have a LaTeX installation, use `MacTeX <http://www.tug.org/mactex/2011/>`_

*If you have any corrections to the instructions for these platforms
or you have a dependency list for Fedora, CentOS, Red Hat, or other
related distributions, please submit a pull request to add this
information to this document.*

To build a test version of the Manual, issue the following command: ::

     make publish

This places a complete version of the manual in
"``../public-docs/``" named for the current branch (as of
*2012-03-19*, typically master.)

To publish a new build of the manual, issue the following command: ::

     make push

**Warning:** *This target depends on* ``publish``, *and simply uses*
``rsync`` *to move the content of the* "``../public-docs/``" *to the web
servers. You must have the proper credentials to run these operations.*

*Run* ``publish`` *procedure and thoroughly test the build before pushing
it live.*

Troubleshooting
---------------

If you encounter problems with the build, please contact the `docs
team <mailto:docs@10gen.com>`_, so that we can update this guide
and/or fix the build process.
