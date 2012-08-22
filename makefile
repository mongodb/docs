# Makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    = -c ./
SPHINXBUILD   = sphinx-build
PAPER	      =
BUILDDIR      = build
SRCDIR	      = source
PUBLISHDIR    = build/publish

# Internal variables.
PAPEROPT_a4	= -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS	= -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source

.PHONY: help clean html dirhtml pickle json htmlhelp qthelp latex changes linkcheck

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "	 html	   to make standalone HTML files"
	@echo "	 dirhtml   to make HTML files named index.html in directories"
	@echo "	 latex	   to make LaTeX files, you can set PAPER=a4 or PAPER=letter"
	@echo "	 changes   to make an overview of all changed/added/deprecated items"
	@echo "	 linkcheck to check all external links for integrity"

build-prep:
	-mkdir -p $(SRCDIR)/_static
	-mkdir -p $(PUBLISHDIR)/single
	@echo directories made

publish: build-prep $(PUBLISHDIR)
$(PUBLISHDIR): $(PUBLISHDIR)/ $(PUBLISHDIR)/single/ $(PUBLISHDIR)/single/_static

$(PUBLISHDIR)/:$(BUILDDIR)/html/ $(BUILDDIR)/singlehtml/
	cp -R $</* $@
$(PUBLISHDIR)/single/: $(PUBLISHDIR)/single/genindex.html
	cp -R $(BUILDDIR)/singlehtml/* $@
	sed -i -e 's/id="searchbox"/id="display-none"/g' -e 's/id="editions"/id="display-none"/g' $(PUBLISHDIR)/single/index.html
$(PUBLISHDIR)/single/genindex.html:$(BUILDDIR)/html/genindex.html
	cp $< $@
	sed -i -r -e 's@(<dt><a href=").*html#@\1./index.html#@' -e 's@(class="toctree-l1"><a class="reference internal" href=")(.*).html@\1../\2.html@' -e 's/id="searchbox"/id="display-none"/g' -e 's/id="navigation"/id="display-none"/g' -e 's/id="editions"/id="display-none"/g' $@
$(PUBLISHDIR)/single/_static:$(PUBLISHDIR)/_static/
	ln -s ../_static _static
	mv _static $@

$(PUBLISHDIR)/_static/:$(PUBLISHDIR)/
$(BUILDDIR)/html/genindex.html:$(BUILDDIR)/html/
$(BUILDDIR)/html/:html
	rm -rf $@_sources/
$(BUILDDIR)/singlehtml/:singlehtml

######################################################################
##
## Push Documents to Production
##
######################################################################

push:publish
	@echo "Copying the new build to the web servers."
	$(MAKE) -j2 MODE='push' push-dc1 push-dc2

ifeq ($(MODE),push)
push-dc1:
	rsync -arz $(BUILDDIR)/publish/ www@www-c1.10gen.cc:/data/sites/docs/mms
push-dc2:
	rsync -arz $(BUILDDIR)/publish/ www@www-c2.10gen.cc:/data/sites/docs/mms
endif

######################################################################
##
## Default Sphinx Targets
##
######################################################################


clean:
	-rm -rf $(BUILDDIR)/*

html:
	-mkdir -p $(SRCDIR)/_static
	@echo directory made
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

dirhtml:
	-mkdir -p $(SRCDIR)/_static
	@echo directory made
	$(SPHINXBUILD) -b dirhtml $(ALLSPHINXOPTS) $(BUILDDIR)/dirhtml
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/dirhtml."

singlehtml:
	$(SPHINXBUILD) -b singlehtml $(ALLSPHINXOPTS) $(BUILDDIR)/singlehtml
	@echo
	@echo "Build finished. The HTML page is in $(BUILDDIR)/singlehtml."

latex:
	-mkdir -p $(SRCDIR)/_static
	@echo directory made
	$(SPHINXBUILD) -b latex $(ALLSPHINXOPTS) $(BUILDDIR)/latex
	@echo
	@echo "Build finished; the LaTeX files are in $(BUILDDIR)/latex."
	@echo "Run \`make all-pdf' or \`make all-ps' in that directory to" \
	      "run these through (pdf)latex."

epub:
	-mkdir -p $(SRCDIR)/_static
	@echo directory made
	$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub
	@echo
	@echo "Build finished. The epub file is in $(BUILDDIR)/epub."

changes:
	$(SPHINXBUILD) -b changes $(ALLSPHINXOPTS) $(BUILDDIR)/changes
	@echo
	@echo "The overview file is in $(BUILDDIR)/changes."

linkcheck:
	$(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
	      "or in $(BUILDDIR)/linkcheck/output.txt."
