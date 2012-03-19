================================================
Building and Deploying the MongoDB Documentation
================================================

This document contains more direct instructions for building the
MongoDB documentation.

Requirements
------------

- GNU Make
- Python
- Git
- Sphinx (documentation management)
- Pygments (syntax highlighting)
- LaTeX/PDF LaTeX (typically texlive; for building PDFs)
- Common Utilities (rsync, tar, gzip, sed)

Building the Documentation
--------------------------

Clone the repostiory: ::

     git clone git://github.com/mongodb/docs.git

Install dependencies. The TeX/LaTeX dependency is very large, but is
only required if building the PDF edition, or building for production
deployment (i.e. ``make push``).

See above for list. On Arch Linux, use the following command to
install the full dependencies: ::

     pacman -S texlive-bin texlive-core texlive-latexextra python2-sphinx python2-pygments

On Debian/Ubuntu systems use the following command: ::

     apt-get install python-sphinx texlive-latex-recommended texlive-latex-recommended

**Note:** *The Debian/Ubuntu dependencies, have not been thoroughly
tested. If you find an additional dependency, please submit a pull
request to modify this document.*

*Additionally, if you have a dependency list for OS X or for Fedora,
CentOS, Red Hat, or other related distributions, please submit a
pull request to add this information to this document.*

To build a test version of the Manual, issue the following command: ::

     make publish

This places a complete version of the manual in
"``../public-docs/``" named for the current branch (as of
*2012-03-19*, typically master.)

To publish a new build of the manual, issue the following command:

     make push

**Warning:** *This target depends on* ``publish``, *and simply uses*
``rsync`` *to move the content of the* "``../public-docs/``" *to the web
servers. You must have the proper credentials to run these operations.*

*Run* ``publish`` *procedure and thoroughly test the build before pushing
it live.*

To build a quick demo build for viewing the documentation locally and
testing features of the documentation, use the following target:

     make html

This places a simple build of the HTML content of the manual in
"``build/html/``".

Troubleshooting
---------------

If you encounter problems with the build, please contact the `docs
team <mailto:docs@10gen.com>`_, so that we can update this guide
and/or fix the build process.
