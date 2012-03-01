# Makefile for MongoDB Sphinx documentation

# You can set these variables from the command line.
SPHINXOPTS    = -c ./
SPHINXBUILD   = sphinx-build
PAPER	      =

# change this to reflect the location of the public repo
publication-output = ../public-docs
publication-script = $(publication-output)/publish.sh $(publication-output)
current-branch := $(shell git branch --no-color 2> /dev/null | sed -e "/^[^*]/d" -e "s/* \(.*\)/\1/" )

# Build directory tweaking.
root-build = build
branch-build = $(root-build)/$(current-branch)

ifeq ($(MODE),publish)
	BUILDDIR = $(branch-build)
else
	BUILDDIR = $(root-build)
endif

# Internal variables.
PAPEROPT_a4		= -D latex_paper_size=a4
PAPEROPT_letter 	= -D latex_paper_size=letter
ALLSPHINXOPTS		= -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source
ASPIRATIONALOPTS	= -d $(BUILDDIR)/aspiration-doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) aspiration

.PHONY: help clean html dirhtml singlehtml epub latex latexpdf text man changes linkcheck build-branch setup-branches publish

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "	 html	    to make standalone HTML files"
	@echo "	 dirhtml    to make HTML files named index.html in directories"
	@echo "	 singlehtml to make a single large HTML file"
	@echo "	 epub	    to make an epub"
	@echo "	 latex	    to make LaTeX files, you can set PAPER=a4 or PAPER=letter"
	@echo "	 latexpdf   to make LaTeX files and run them through pdflatex"
	@echo "	 man	    to make manual pages"
	@echo "	 changes    to make an overview of all changed/added/deprecated items"
	@echo "	 linkcheck  to check all external links for integrity"
	@echo ""
	@echo "MongoDB Manual Specific Targets."
	@echo "	 publish	runs 'make build-branch' and then deploys the build to $(publication-output)"
	@echo "	 branch-setup	to setup git branches for the first time."
	@echo "	 build-branch	to build the current branch."
	@echo "See 'meta.build-process.rst' for more information."

#
# Meta targets that control the build and publication process.
#

publish:
	make MODE='publish' build-branch
	make MODE='publish' deploy

build-branch:
	@echo Running a build of the \$(current-branch)\ branch.
	@echo ""
	make MODE='publish' dirhtml
	make MODE='publish' singlehtml
	@echo "All builds complete.'"
	@echo "to complete the build process."

ifeq ($(MODE),publish)
deploy:
	@echo "Exporting builds..."
	sed -i 's/href="contents.html/href="index.html/g' $(BUILDDIR)/singlehtml/index.html
	cp $(BUILDDIR)/dirhtml/search/index.html $(BUILDDIR)/singlehtml/search.html
	mkdir -p $(publication-output)/$(current-branch)/single/
	cp -R $(BUILDDIR)/dirhtml/* $(publication-output)/$(current-branch)
	cp -R $(BUILDDIR)/singlehtml/* $(publication-output)/$(current-branch)/single/
	@echo "Running the publication routine..."
	$(publication-script)
	@echo "Publication succeessfully deployed."
endif

disabled-builds:
	@echo make epub
	@echo make latexpdf
	@echo cp -R $(BUILDDIR)/epub/MongoDB.epub $(publication-output)/$(current-branch)/MongoDB-manual-$(current-branch).epub
	@echo cp -R $(BUILDDIR)/latex/MongoDB.pdf $(publication-output)/$(current-branch)/MongoDB-manual-$(current-branch).pdf
	@echo
	@echo This target did nothing, eventually these procedures will generate epub and latex builds.

#
# Configures the repository for the branched documentaion workflow.
#

branch-setup:
	@echo git checkout master
	@echo git config branch.autosetupmerge true
	@echo git branch --track current origin/current
	@echo git branch --track hyperalpha origin/hyperalpha
	@echo git branch --track 1.8-series origin/1.8-series
	@echo git branch --track 2.0-series origin/2.0-series
	@echo "this will do more once branching works"

# TODO create helpers for branch switching/building.
# TODO create helpers for chery picking repos.

#
# Clean up/removal targets
#

clean:
	-rm -rf $(BUILDDIR)/*
clean-all:
	-rm -rf $(root-build)/*

######################################################################
#
# Default Sphinx build targets in use.
#
######################################################################



html:
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

dirhtml:
	$(SPHINXBUILD) -b dirhtml $(ALLSPHINXOPTS) $(BUILDDIR)/dirhtml
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/dirhtml."

singlehtml:
	$(SPHINXBUILD) -b singlehtml $(ALLSPHINXOPTS) $(BUILDDIR)/singlehtml
	mv $(BUILDDIR)/singlehtml/contents.html $(BUILDDIR)/singlehtml/index.html
	@echo
	@echo "Build finished. The HTML page is in $(BUILDDIR)/singlehtml."

epub:
	$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub
	@echo
	@echo "Build finished. The epub file is in $(BUILDDIR)/epub."

man:
	$(SPHINXBUILD) -b man $(ALLSPHINXOPTS) $(BUILDDIR)/man
	@echo
	@echo "Build finished. The manual pages are in $(BUILDDIR)/man."

changes:
	$(SPHINXBUILD) -b changes $(ALLSPHINXOPTS) $(BUILDDIR)/changes
	@echo
	@echo "The overview file is in $(BUILDDIR)/changes."

linkcheck:
	$(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
	      "or in $(BUILDDIR)/linkcheck/output.txt."


######################################################################
#
# Build Targets for Aspirational Builds.
#
######################################################################


aspirational-html:
	$(SPHINXBUILD) -b html $(ASPIRATIONALOPTS) $(BUILDDIR)/aspiration-html
	@echo
	@echo "Build finished. The Aspirational HTML pages are in $(BUILDDIR)/aspiration-html."

aspirational-dirhtml:
	$(SPHINXBUILD) -b dirhtml $(ASPIRATIONALOPTS) $(BUILDDIR)/aspiration-dirhtml
	@echo
	@echo "Build finished. The Aspirational HTML pages are in $(BUILDDIR)/aspiration-dirhtml."

aspirational-latex:
	$(SPHINXBUILD) -b latex $(ASPIRATIONALOPTS) $(BUILDDIR)/aspiration-latex
	@echo
	@echo "Build finished; the Aspirational LaTeX files are in $(BUILDDIR)/aspiration-latex."
	@echo "Run \`make' in that directory to run these through (pdf)latex" \
	      "(use \`make latexpdf' here to do that automatically)."

aspirational-latexpdf:
	$(SPHINXBUILD) -b latex $(ASPIRATIONALOPTS) $(BUILDDIR)/aspiration-latex
	@echo "Running LaTeX files through pdflatex..."
	$(MAKE) -C $(BUILDDIR)/latex all-pdf
	@echo "pdflatex finished; the Aspirational PDF files are in $(BUILDDIR)/aspiration-latex."

aspirational-linkcheck:
	$(SPHINXBUILD) -b linkcheck $(ASPIRATIONALOPTS) $(BUILDDIR)/aspiration-linkcheck
	@echo
	@echo "Aspirational link check complete; look for any errors in the above output " \
	      "or in $(BUILDDIR)/aspiration-linkcheck/output.txt."

######################################################################
#
# Default Sphinx targets that we're not using at all.
#
######################################################################
#
# .PHONY: pickle json htmlhelp qthelp devhelp doctest
#
# disabled-help:
#	@echo "	 doctest    to run all doctests embedded in the documentation (if enabled)"
#	@echo "	 json	    to make JSON files"
#	@echo "	 pickle	    to make pickle files"
#	@echo "	 htmlhelp   to make HTML files and a HTML help project"
#	@echo "	 qthelp	    to make HTML files and a qthelp project"
#	@echo "	 text	    to make text files"
#	@echo "	 devhelp    to make HTML files and a Devhelp project"
#
# pickle:
#	$(SPHINXBUILD) -b pickle $(ALLSPHINXOPTS) $(BUILDDIR)/pickle
#	@echo
#	@echo "Build finished; now you can process the pickle files."
#
# json:
#	$(SPHINXBUILD) -b json $(ALLSPHINXOPTS) $(BUILDDIR)/json
#	@echo
#	@echo "Build finished; now you can process the JSON files."
#
# htmlhelp:
#	$(SPHINXBUILD) -b htmlhelp $(ALLSPHINXOPTS) $(BUILDDIR)/htmlhelp
#	@echo
#	@echo "Build finished; now you can run HTML Help Workshop with the" \
#	      ".hhp project file in $(BUILDDIR)/htmlhelp."
#
# text:
#	$(SPHINXBUILD) -b text $(ALLSPHINXOPTS) $(BUILDDIR)/text
#	mv $(BUILDDIR)/text/contents.txt $(BUILDDIR)/text/text.txt
#	@echo
#	@echo "Build finished. The text files are in $(BUILDDIR)/text."
#
# qthelp:
#	$(SPHINXBUILD) -b qthelp $(ALLSPHINXOPTS) $(BUILDDIR)/qthelp
#	@echo
#	@echo "Build finished; now you can run "qcollectiongenerator" with the" \
#	      ".qhcp project file in $(BUILDDIR)/qthelp, like this:"
#	@echo "# qcollectiongenerator $(BUILDDIR)/qthelp/MongoDB.qhcp"
#	@echo "To view the help file:"
#	@echo "# assistant -collectionFile $(BUILDDIR)/qthelp/MongoDB.qhc"
#
# devhelp:
#	$(SPHINXBUILD) -b devhelp $(ALLSPHINXOPTS) $(BUILDDIR)/devhelp
#	@echo
#	@echo "Build finished."
#	@echo "To view the help file:"
#	@echo "# mkdir -p $$HOME/.local/share/devhelp/MongoDB"
#	@echo "# ln -s $(BUILDDIR)/devhelp $$HOME/.local/share/devhelp/MongoDB"
#	@echo "# devhelp"
#
# doctest:
#	$(SPHINXBUILD) -b doctest $(ALLSPHINXOPTS) $(BUILDDIR)/doctest
#	@echo "Testing of doctests in the sources finished, look at the " \
#	      "results in $(BUILDDIR)/doctest/output.txt."
