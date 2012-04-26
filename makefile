# Makefile for MongoDB Sphinx documentation

# You can set these variables from the command line.
SPHINXOPTS    = -c ./
SPHINXBUILD   = sphinx-build
PAPER	      =

# change this to reflect the location of the public repo
publication-output = ../public-docs

# change this to reflect the branch that "manual/" will point to
manual-branch = master
# intuit the current branch
current-branch := $(shell git symbolic-ref HEAD 2>/dev/null | cut -d "/" -f "3" )

# Build directory tweaking.
CURRENTBUILD = $(publication-output)/$(current-branch)
BUILDDIR = build

# helpers for compressing man pages
UNCOMPRESSED_MAN := $(wildcard $(BUILDDIR)/man/*.1)
COMPRESSED_MAN := $(subst .1,.1.gz,$(UNCOMPRESSED_MAN))

# Internal variables.
PAPEROPT_a4		= -D latex_paper_size=a4
PAPEROPT_letter		= -D latex_paper_size=letter
ALLSPHINXOPTS		= -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source
ASPIRATIONALOPTS	= -d $(BUILDDIR)/aspiration-doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) aspiration

.PHONY: help clean html dirhtml singlehtml epub latex latexpdf text man changes linkcheck build-branch publish process push setup pdfs

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
	@echo "	 publish	runs 'make process' and then deploys the build to $(publication-output)"
	@echo "See 'meta.build.rst' for more information."

#
# Meta targets that control the build and publication process.
#

push:publish
	@echo "Copying the new build to the web servers."
	$(MAKE) -j2 MODE='push' push-dc1 push-dc2

publish:
	@echo "Running the publication and migration routine..."
	$(MAKE) -j1 html
	$(MAKE) -j MODE='publish' deploy
	@echo "Publication succeessfully deployed to '$(publication-output)'."
	@echo

#
# Targets for pushing the new build to the web servers.
#

ifeq ($(MODE),push)
push-dc1:
	rsync -arz ../public-docs/ www@www-c1.10gen.cc:/data/sites/docs
push-dc2:
	rsync -arz ../public-docs/ www@www-c2.10gen.cc:/data/sites/docs
endif

#
# Targets that should/need only be accessed in publication, within a protective "ifeq"
#

ifeq ($(MODE),publish)
# Build dependcies for the publication mode operation. This is the
# only target that you need to call explictly.

deploy: $(CURRENTBUILD)/release.txt $(CURRENTBUILD) $(publication-output)/index.html

# Establish dependencies for building the manual.
$(CURRENTBUILD):$(CURRENTBUILD)/MongoDB-Manual.pdf $(CURRENTBUILD)/MongoDB-Manual.epub $(CURRENTBUILD)/single/ $(CURRENTBUILD)/

# Build and Migrate all required Manual Content
$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).pdf:$(BUILDDIR)/latex/MongoDB.pdf
	cp $< $@
$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).epub:$(BUILDDIR)/epub/MongoDB.epub
	cp $< $@
$(CURRENTBUILD)/MongoDB-Manual.epub:$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).epub
	rm -f $@
	ln -s -f MongoDB-Manual-$(current-branch).epub $@
$(CURRENTBUILD)/MongoDB-Manual.pdf:$(CURRENTBUILD)/MongoDB-Manual-$(current-branch).pdf
	rm -f $@
	ln -s -f MongoDB-Manual-$(current-branch).pdf $@
$(CURRENTBUILD)/:$(BUILDDIR)/dirhtml
	cp -R $</* $@
$(CURRENTBUILD)/single/: $(BUILDDIR)/singlehtml/ $(CURRENTBUILD)/single/search.html $(CURRENTBUILD)/single/genindex.html
	cp -R $(BUILDDIR)/singlehtml/* $@
	mv $@contents.html $@index.html
	sed -i 's/href="contents.html/href="index.html/g' $(CURRENTBUILD)/single/index.html
$(CURRENTBUILD)/single/search.html:$(BUILDDIR)/dirhtml/search/index.html
	cp $< $@
$(CURRENTBUILD)/single/genindex.html:$(BUILDDIR)/html/genindex.html
	cp $< $@
	sed -i -r 's@(<dt><a href=").*html#@\1./#@' $@
$(BUILDDIR)/latex/MongoDB.pdf:$(BUILDDIR)/latex/MongoDB.tex

# Establish proper dependencies with Sphinx aspects of the build.
$(BUILDDIR)/dirhtml $(BUILDDIR)/dirhtml/search/index.html:dirhtml
$(BUILDDIR)/html/genindex.html:$(BUILDDIR)/html/
$(BUILDDIR)/singlehtml/:singlehtml
$(BUILDDIR)/epub/MongoDB.epub:epub
$(BUILDDIR)/latex/MongoDB.tex:latex

# Commented out because this will always force a redundant rebuild 
# given the above method of invocation.
# $(BUILDDIR)/html/:html 

# Deployment related work for the non-Sphinx aspects of the build.
$(publication-output)/manual:$(CURRENTBUILD)
$(publication-output)/index.html: themes/docs.mongodb.org/index.html
	cp $< $@
$(CURRENTBUILD)/release.txt:deploy-setup $(publication-output)/manual
	@touch $(CURRENTBUILD)/release.txt
	git rev-parse --verify HEAD >|$@
	@touch source/about.txt
deploy-setup:
	mkdir -p $(publication-output)/$(current-branch) $(CURRENTBUILD)/single/
	ln -f -s $(manual-branch) manual
	mv manual $(publication-output)
endif

#
# Targets to build compressed man pages.
#
build-man: man $(COMPRESSED_MAN)
compress-man: $(COMPRESSED_MAN)
$(BUILDDIR)/man/%.1.gz: $(BUILDDIR)/man/%.1
	gzip $< -c > $@

#
# Clean up/removal targets.
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
	@echo "Build finished. The (dir) HTML pages are in $(BUILDDIR)/dirhtml."

singlehtml:
	$(SPHINXBUILD) -b singlehtml $(ALLSPHINXOPTS) $(BUILDDIR)/singlehtml
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
	@echo

latex:
	$(SPHINXBUILD) -b latex $(ALLSPHINXOPTS) $(BUILDDIR)/latex
	sed -i -r 's/\\bfcode\{--(.*)\}/\\bfcode\{-\{-\}\1\}/' $(BUILDDIR)/latex/*.tex
	@echo
	@echo "TeX Build finished; the LaTeX files are in $(BUILDDIR)/latex."

latexpdf:latex
	@echo "Running LaTeX files through pdflatex..."
	$(MAKE) -C $(BUILDDIR)/latex all-pdf
	@echo "pdflatex finished; the PDF files are in $(BUILDDIR)/latex."

######################################################################
#
# Build Targets for Aspirational Builds.
#
######################################################################

.PHONY: aspirational-html aspirational-dirhtml aspirational-latex aspirational-latexpdf aspirational-linkcheck

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
	sed -i -r 's/\\bfcode\{--(.*)\}/\\bfcode\{-{-}\1\}/' $(BUILDDIR)/latex/*.tex
	@echo
	@echo "TeX build finished; the Aspirational LaTeX files are in $(BUILDDIR)/aspiration-latex."
	@echo "Run \`make' in that directory to run these through (pdf)latex" \
	      "(use \`make latexpdf' here to do that automatically)."

aspirational-latexpdf: aspirational-latex
	$(SPHINXBUILD) -b latex $(ASPIRATIONALOPTS) $(BUILDDIR)/aspiration-latex
	@echo "Running LaTeX files through pdflatex..."
	$(MAKE) -C $(BUILDDIR)/latex all-pdf
	@echo "pdflatex finished; the Aspirational PDF files are in $(BUILDDIR)/aspiration-latex."

aspirational-linkcheck:
	$(SPHINXBUILD) -b linkcheck $(ASPIRATIONALOPTS) $(BUILDDIR)/aspiration-linkcheck
	@echo
	@echo "Aspirational link check complete; look for any errors in the above output " \
	      "or in $(BUILDDIR)/aspiration-linkcheck/output.txt."

##########################################################################
#
# Default Sphinx targets that are totally unused, but around just in case.
#
##########################################################################

.PHONY: pickle json htmlhelp qthelp devhelp doctest

json:
	$(SPHINXBUILD) -b json $(ALLSPHINXOPTS) $(BUILDDIR)/json
	@echo
	@echo "Build finished; now you can process the JSON files."

pickle:
	$(SPHINXBUILD) -b pickle $(ALLSPHINXOPTS) $(BUILDDIR)/pickle
	@echo
	@echo "The pickle file is in $(BUILDDIR)/pickle."

changes:
	$(SPHINXBUILD) -b changes $(ALLSPHINXOPTS) $(BUILDDIR)/changes
	@echo
	@echo "The overview file is in $(BUILDDIR)/changes."

linkcheck:
	$(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
	      "or in $(BUILDDIR)/linkcheck/output.txt."

doctest:
	$(SPHINXBUILD) -b doctest $(ALLSPHINXOPTS) $(BUILDDIR)/doctest
	@echo "Testing of doctests in the sources finished, look at the " \
	      "results in $(BUILDDIR)/doctest/output.txt."

####################
#
# PDF Build System.
#
####################
PDFLATEXCOMMAND = TEXINPUTS=".:$(BUILDDIR)/latex/:" pdflatex --interaction batchmode --output-directory $(BUILDDIR)/latex/
pdfs:latex
	$(MAKE) MODE='$(MODE)' `find $(BUILDDIR)/latex/ -name "*.tex" | sed "s/\.tex/.pdf/"`
%.pdf:%.tex
	$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<'
	-makeindex -s $(BUILDDIR)/latex/python.ist '$(basename $<).idx'
	$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<'
	$(PDFLATEXCOMMAND) $(LATEXOPTS) '$<'
